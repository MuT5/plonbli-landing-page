import { useState } from "react";
import { Send, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabase";

const socials = [
  { name: "Telegram (Kanał)", icon: Send, href: "https://t.me/plonbli" },
  { name: "Telegram (Grupa)", icon: Send, href: "https://t.me/Plonbligrupa" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/plonbli/" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1YkUnnggkF/" },
  { name: "X", icon: Twitter, href: "https://x.com/plonbli" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const { error } = await supabase.from('subscribers').insert({ email });

    if (!error) {
      toast.success("Dziękujemy za zapisanie się!");
      setEmail("");
    } else if (error.code === '23505') {
      toast.error("Ten adres e-mail jest już zapisany");
    } else {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <ThemeToggle />
      <motion.div
        className="w-full max-w-md space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="text-center space-y-4" variants={fadeUp}>
          <img
            src={`${import.meta.env.BASE_URL}plonbliLogoBezTlaKolo-removebg-preview.png`}
            alt="Plonbli"
            className="mx-auto h-32 w-auto dark:hidden"
          />
          <img
            src={`${import.meta.env.BASE_URL}plonbliLogoBezTla-removebg-preview.png`}
            alt="Plonbli"
            className="mx-auto h-32 w-auto hidden dark:block"
          />
          <p className="text-lg text-muted-foreground">
            Plonbli — plon blisko Ciebie!
          </p>
          <div className="inline-block px-4 py-2 border-2 border-[#69b044] rounded-xl bg-[#69b044]/5">
            <p className="text-sm font-bold text-[#69b044]">
              Kupuj lokalnie - znajdź rolnika w Twojej okolicy i wspieraj polskich producentów!
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div variants={fadeUp}>
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Aplikacja już wkrótce! Tymczasem śledź nas w mediach społecznościowych lub zapisz się do newslettera, żeby nie przegapić startu.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Buttons */}
        <motion.div className="flex flex-col gap-3" variants={fadeUp}>
          {socials.map(({ name, icon: Icon, href }, i) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                className="h-12 gap-2 text-sm w-full hover:bg-[#fefcda] hover:text-[#69b044]"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="size-4" />
                  {name}
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={fadeUp}>
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="bg-[#69b044] hover:bg-[#fefcda] hover:text-[#69b044] text-white">Zapisz się</Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
