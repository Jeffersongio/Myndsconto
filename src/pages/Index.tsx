import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Tag, 
  Star, 
  Crown, 
  Zap, 
  ShoppingBag, 
  Gamepad2, 
  Utensils, 
  Plane, 
  Shirt,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState("free");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "Todos", icon: Tag },
    { id: "shopping", name: "Shopping", icon: ShoppingBag },
    { id: "games", name: "Games", icon: Gamepad2 },
    { id: "food", name: "Alimentação", icon: Utensils },
    { id: "travel", name: "Viagem", icon: Plane },
    { id: "fashion", name: "Moda", icon: Shirt },
  ];

  const coupons = [
    {
      id: 1,
      store: "Amazon",
      title: "15% OFF em Eletrônicos",
      code: "TECH15",
      discount: "15%",
      category: "shopping",
      tier: "free",
      expires: "31/12/2024",
      used: 1234,
      image: "🛒"
    },
    {
      id: 2,
      store: "Steam",
      title: "50% OFF em Jogos Indie",
      code: "INDIE50",
      discount: "50%",
      category: "games",
      tier: "premium",
      expires: "25/12/2024",
      used: 856,
      image: "🎮"
    },
    {
      id: 3,
      store: "iFood",
      title: "Frete Grátis + R$20 OFF",
      code: "DELIVERY20",
      discount: "R$20",
      category: "food",
      tier: "free",
      expires: "30/11/2024",
      used: 2341,
      image: "🍕"
    },
    {
      id: 4,
      store: "Nike",
      title: "30% OFF em Tênis Premium",
      code: "PREMIUM30",
      discount: "30%",
      category: "fashion",
      tier: "vip",
      expires: "15/01/2025",
      used: 432,
      image: "👟"
    },
    {
      id: 5,
      store: "Booking",
      title: "25% OFF em Hotéis 5 Estrelas",
      code: "LUXURY25",
      discount: "25%",
      category: "travel",
      tier: "vip",
      expires: "28/02/2025",
      used: 187,
      image: "🏨"
    },
    {
      id: 6,
      store: "Spotify",
      title: "3 Meses Grátis Premium",
      code: "MUSIC3M",
      discount: "3 meses",
      category: "shopping",
      tier: "premium",
      expires: "31/01/2025",
      used: 967,
      image: "🎵"
    }
  ];

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      features: [
        "5 cupons por mês",
        "Cupons básicos",
        "Suporte por email"
      ],
      tier: "free",
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 19,90",
      period: "/mês",
      features: [
        "Cupons ilimitados",
        "Cupons exclusivos",
        "Notificações em tempo real",
        "Suporte prioritário"
      ],
      tier: "premium",
      popular: true
    },
    {
      name: "VIP",
      price: "R$ 39,90",
      period: "/mês",
      features: [
        "Todos os benefícios Premium",
        "Cupons VIP exclusivos",
        "Descontos até 70%",
        "Acesso antecipado",
        "Suporte 24/7"
      ],
      tier: "vip",
      popular: false
    }
  ];

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo de volta ao Myndsconto!",
    });
  };

  const handleRegister = (email: string, password: string, name: string) => {
    setIsLoggedIn(true);
    toast({
      title: "Conta criada com sucesso!",
      description: "Bem-vindo ao Myndsconto! Aproveite seus cupons gratuitos.",
    });
  };

  const handleUpgrade = (planTier: string) => {
    setUserPlan(planTier);
    toast({
      title: "Plano atualizado!",
      description: `Você agora tem acesso aos benefícios do plano ${planTier === 'premium' ? 'Premium' : 'VIP'}!`,
    });
  };

  const copyCoupon = (code: string, tier: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Faça login primeiro",
        description: "Você precisa estar logado para copiar cupons.",
        variant: "destructive"
      });
      return;
    }

    if (tier === "premium" && userPlan === "free") {
      toast({
        title: "Upgrade necessário",
        description: "Este cupom está disponível apenas para usuários Premium.",
        variant: "destructive"
      });
      return;
    }

    if (tier === "vip" && userPlan !== "vip") {
      toast({
        title: "Upgrade necessário",
        description: "Este cupom está disponível apenas para usuários VIP.",
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(code);
    toast({
      title: "Cupom copiado!",
      description: `Código ${code} copiado para a área de transferência.`,
    });
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || coupon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "premium":
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Star className="w-3 h-3 mr-1" />Premium</Badge>;
      case "vip":
        return <Badge className="bg-purple-500 hover:bg-purple-600"><Crown className="w-3 h-3 mr-1" />VIP</Badge>;
      default:
        return <Badge variant="secondary">Grátis</Badge>;
    }
  };

  const canAccessCoupon = (couponTier: string) => {
    if (couponTier === "free") return true;
    if (couponTier === "premium" && (userPlan === "premium" || userPlan === "vip")) return true;
    if (couponTier === "vip" && userPlan === "vip") return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Myndsconto
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <Badge className={`${
                    userPlan === 'vip' ? 'bg-purple-500' : 
                    userPlan === 'premium' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {userPlan === 'vip' ? <Crown className="w-3 h-3 mr-1" /> : 
                     userPlan === 'premium' ? <Star className="w-3 h-3 mr-1" /> : null}
                    {userPlan === 'free' ? 'Gratuito' : userPlan === 'premium' ? 'Premium' : 'VIP'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                      <User className="w-4 h-4 mr-2" />
                      Entrar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Acesse sua conta</DialogTitle>
                      <DialogDescription>
                        Entre ou crie uma conta para acessar cupons exclusivos
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Entrar</TabsTrigger>
                        <TabsTrigger value="register">Cadastrar</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Senha</Label>
                          <Input id="password" type="password" />
                        </div>
                        <Button onClick={() => handleLogin("", "")} className="w-full bg-gradient-to-r from-blue-600 to-green-500">
                          Entrar
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-reg">Email</Label>
                          <Input id="email-reg" type="email" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-reg">Senha</Label>
                          <Input id="password-reg" type="password" />
                        </div>
                        <Button onClick={() => handleRegister("", "", "")} className="w-full bg-gradient-to-r from-blue-600 to-green-500">
                          Criar Conta
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Economize com os Melhores Cupons
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra ofertas incríveis, cupons exclusivos e economize em suas compras favoritas. 
            Upgrade sua conta para acessar descontos ainda melhores!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar cupons ou lojas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 ${
                selectedCategory === category.id 
                  ? "bg-gradient-to-r from-blue-600 to-green-500 text-white" 
                  : "hover:bg-gray-100"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              !canAccessCoupon(coupon.tier) ? 'opacity-60' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{coupon.image}</div>
                    <div>
                      <CardTitle className="text-lg">{coupon.store}</CardTitle>
                      <CardDescription className="text-sm">{coupon.used} pessoas usaram</CardDescription>
                    </div>
                  </div>
                  {getTierBadge(coupon.tier)}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2 text-gray-800">{coupon.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">{coupon.discount} OFF</div>
                  <div className="text-sm text-gray-500">Até {coupon.expires}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono border-2 border-dashed border-gray-300 flex-1 text-center">
                    {coupon.code}
                  </code>
                  <Button
                    size="sm"
                    onClick={() => copyCoupon(coupon.code, coupon.tier)}
                    disabled={!canAccessCoupon(coupon.tier)}
                    className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                  >
                    Copiar
                  </Button>
                </div>
                {!canAccessCoupon(coupon.tier) && (
                  <p className="text-xs text-red-500 mt-2 text-center">
                    {coupon.tier === "premium" ? "Upgrade para Premium necessário" : "Upgrade para VIP necessário"}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plans Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Escolha seu Plano</h2>
            <p className="text-gray-600 text-lg">
              Upgrade sua conta e tenha acesso a cupons exclusivos com descontos maiores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.tier} className={`relative ${
                plan.popular ? 'border-2 border-blue-500 shadow-lg scale-105' : 'border'
              } hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 hover:bg-blue-600 px-3 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      userPlan === plan.tier 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600' 
                          : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => handleUpgrade(plan.tier)}
                    disabled={userPlan === plan.tier}
                  >
                    {userPlan === plan.tier ? 'Plano Atual' : plan.tier === 'free' ? 'Plano Gratuito' : 'Fazer Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Myndsconto</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Sua plataforma de cupons e ofertas exclusivas. Economize mais com os melhores descontos do mercado.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Shopping</li>
                <li>Games</li>
                <li>Alimentação</li>
                <li>Viagem</li>
                <li>Moda</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Como Usar</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sobre Nós</li>
                <li>Parceiros</li>
                <li>Carreiras</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Myndsconto. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
