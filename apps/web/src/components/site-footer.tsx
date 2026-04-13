export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} JH. All rights reserved.</p>
      </div>
    </footer>
  );
}
