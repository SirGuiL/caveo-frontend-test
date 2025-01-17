export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 p-7 h-full">
      <span className="text-xl font-semibold">Carrinho de compras</span>

      {children}
    </div>
  );
}
