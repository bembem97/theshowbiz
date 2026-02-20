export default function CelebrityLayout({ children }: LayoutProps<"/stars">) {
  return (
    <div className="space-y-6 py-6">
      <h1 className="ml-2">{"Today's Most Popular Pop Icons"}</h1>
      {children}
    </div>
  );
}
