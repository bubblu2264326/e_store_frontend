import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { CartItem } from '@/lib/types';
import { Printer, Download, X } from 'lucide-react';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  orderNumber: string;
}

export function Receipt({ isOpen, onClose, items, total, orderNumber }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        .receipt {
          font-family: 'Arial', sans-serif;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
        }
        .receipt-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .receipt-logo {
          max-width: 120px;
          margin: 0 auto 10px;
        }
        .receipt-items {
          border-top: 1px dashed #ccc;
          border-bottom: 1px dashed #ccc;
          padding: 20px 0;
          margin: 20px 0;
        }
        .receipt-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .receipt-total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-top: 20px;
        }
        .receipt-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
        }
        @media print {
          body { margin: 0; padding: 20px; }
          .receipt { box-shadow: none; }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - Order #${orderNumber}</title>
          ${styles}
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const content = receiptRef.current;
    if (!content) return;

    const receipt = `
eStore - Order Receipt
Order #${orderNumber}
Date: ${new Date().toLocaleDateString()}
----------------------------------------

Items:
${items.map(item => `
${item.title}
Qty: ${item.quantity} x ${formatPrice(item.price)}
Subtotal: ${formatPrice(item.price * item.quantity)}
`).join('\n')}

----------------------------------------
Total: ${formatPrice(total)}

Thank you for shopping with us!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Receipt
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div ref={receiptRef} className="receipt bg-white p-6 rounded-lg">
          <div className="receipt-header">
            <img src="/logo.png" alt="eStore Logo" className="h-16 mb-4 mx-auto" />
            <p className="text-sm text-gray-500">Order #{orderNumber}</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="receipt-items space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="receipt-total border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="receipt-footer mt-6 text-center text-sm text-gray-500">
            <p>Thank you for shopping with us!</p>
            <p>Visit us again at estore.com</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 