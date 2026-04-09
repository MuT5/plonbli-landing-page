import { useState } from "react";
import { Send, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const socials = [
  { name: "Telegram", icon: Send, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
];

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Dziękujemy za zapisanie się!");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Plonbli
          </h1>
          <p className="text-lg text-muted-foreground">
            Plonbli — plon blisko Ciebie!
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="backdrop-blur-sm bg-card/80 border-border/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Aplikacja już wkrótce! Tymczasem śledź nas w mediach społecznościowych lub zapisz się do newslettera, żeby nie przegapić startu.
            </p>
          </CardContent>
        </Card>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {socials.map(({ name, icon: Icon, href }) => (
            <Button
              key={name}
              variant="outline"
              className="h-12 gap-2 text-sm"
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="size-4" />
                {name}
              </a>
            </Button>
          ))}
        </div>

        {/* Newsletter */}
        <Card className="backdrop-blur-sm bg-card/80 border-border/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Twój adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Zapisz się</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
