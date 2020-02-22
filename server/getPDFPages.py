from PyPDF2 import PdfFileReader
import sys
try:
    pdf = PdfFileReader(file(sys.argv[1], "rb"))
    if pdf.isEncrypted:
        pdf.decrypt('')
    print pdf.getNumPages()
except:
    print 0
