import Foundation
import PDFKit
import CoreGraphics
import ImageIO

let args = CommandLine.arguments
guard args.count >= 3 else { FileHandle.standardError.write("usage: render-pdf <pdf> <outPrefix>\n".data(using: .utf8)!); exit(2) }
let pdfPath = args[1]
let outPrefix = args[2]
let scale: CGFloat = 2.0

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    FileHandle.standardError.write("cannot open pdf\n".data(using: .utf8)!); exit(1)
}
let cs = CGColorSpaceCreateDeviceRGB()

for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let w = Int(bounds.width * scale), h = Int(bounds.height * scale)
    guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8,
        bytesPerRow: 0, space: cs, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { continue }
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))
    ctx.scaleBy(x: scale, y: scale)
    ctx.translateBy(x: -bounds.origin.x, y: -bounds.origin.y)
    page.draw(with: .mediaBox, to: ctx)
    guard let img = ctx.makeImage() else { continue }
    let out = URL(fileURLWithPath: "\(outPrefix)-\(i+1).jpg")
    guard let dest = CGImageDestinationCreateWithURL(out as CFURL, "public.jpeg" as CFString, 1, nil) else { continue }
    CGImageDestinationAddImage(dest, img, [kCGImageDestinationLossyCompressionQuality: 0.68] as CFDictionary)
    CGImageDestinationFinalize(dest)
    print("wrote \(out.path) \(w)x\(h)")
}
