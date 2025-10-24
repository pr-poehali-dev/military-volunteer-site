import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [donationAmount, setDonationAmount] = useState('');
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: ''
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время для верификации.',
    });
    setVolunteerForm({ name: '', email: '', phone: '', experience: '', motivation: '' });
  };

  const handleDonation = (amount: string) => {
    setDonationAmount(amount);
    toast({
      title: 'Переход к оплате',
      description: `Сумма пожертвования: ${amount} ₽`,
    });
  };

  const projects = [
    {
      title: 'Помощь ветеранам',
      description: 'Адресная помощь ветеранам боевых действий и их семьям',
      raised: 450000,
      goal: 1000000,
      icon: 'Shield'
    },
    {
      title: 'Поддержка военных',
      description: 'Сбор и доставка необходимого снаряжения на передовую',
      raised: 780000,
      goal: 1000000,
      icon: 'Heart'
    },
    {
      title: 'Реабилитация бойцов',
      description: 'Программа восстановления здоровья участников СВО',
      raised: 320000,
      goal: 500000,
      icon: 'Users'
    }
  ];

  const news = [
    {
      date: '15 октября 2024',
      title: 'Передано 500 комплектов экипировки',
      content: 'Благодаря вашей поддержке мы передали защитное снаряжение на передовую'
    },
    {
      date: '10 октября 2024',
      title: 'Новый волонтёрский центр открыт',
      content: 'Координационный центр начал работу в Москве'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">За Родину</h1>
                <p className="text-sm text-muted-foreground">Волонтёрское движение</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Главная', 'О нас', 'Проекты', 'Волонтёры', 'Новости', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    Поддержать
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Сделать пожертвование</DialogTitle>
                    <DialogDescription>
                      Ваша поддержка помогает нашим героям
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {['500', '1000', '5000'].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => handleDonation(amount)}
                          className="h-16 text-lg font-semibold hover:bg-primary hover:text-white"
                        >
                          {amount} ₽
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="custom-amount">Своя сумма</Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="donation-purpose">Направление помощи</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите проект" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veterans">Помощь ветеранам</SelectItem>
                          <SelectItem value="military">Поддержка военных</SelectItem>
                          <SelectItem value="rehabilitation">Реабилитация</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12"
                      onClick={() => donationAmount && handleDonation(donationAmount)}
                    >
                      Перейти к оплате
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2">
              🇷🇺 Вместе мы сила
            </Badge>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Поддержим наших героев
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Волонтёрское движение помощи участникам СВО, ветеранам и их семьям. 
              Каждый вклад приближает победу и помогает тем, кто защищает нашу Родину.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-14 px-8">
                    <Icon name="Heart" size={20} className="mr-2" />
                    Помочь сейчас
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Сделать пожертвование</DialogTitle>
                    <DialogDescription>
                      Ваша поддержка помогает нашим героям
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {['500', '1000', '5000'].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => handleDonation(amount)}
                          className="h-16 text-lg font-semibold hover:bg-primary hover:text-white"
                        >
                          {amount} ₽
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="hero-amount">Своя сумма</Label>
                      <Input
                        id="hero-amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12"
                      onClick={() => donationAmount && handleDonation(donationAmount)}
                    >
                      Перейти к оплате
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg h-14 px-8">
                    <Icon name="UserPlus" size={20} className="mr-2" />
                    Стать волонтёром
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Регистрация волонтёра</DialogTitle>
                    <DialogDescription>
                      Заполните анкету. После проверки мы свяжемся с вами
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО *</Label>
                      <Input
                        id="name"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Опыт волонтёрства</Label>
                      <Input
                        id="experience"
                        value={volunteerForm.experience}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, experience: e.target.value })}
                        placeholder="Краткое описание"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="motivation">Почему хотите помогать? *</Label>
                      <Textarea
                        id="motivation"
                        required
                        value={volunteerForm.motivation}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, motivation: e.target.value })}
                        className="mt-2 min-h-24"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'Users', number: '2,500+', label: 'Волонтёров' },
              { icon: 'Package', number: '15,000+', label: 'Доставленных грузов' },
              { icon: 'Heart', number: '50М ₽', label: 'Собрано пожертвований' }
            ].map((stat, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat.icon as any} className="text-white" size={28} />
                  </div>
                  <div className="font-heading text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Активные проекты</h3>
            <p className="text-muted-foreground text-lg">Выберите направление помощи</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, idx) => {
              const percentage = Math.round((project.raised / project.goal) * 100);
              return (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={project.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Собрано</span>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-semibold">{project.raised.toLocaleString()} ₽</span>
                          <span className="text-sm text-muted-foreground">из {project.goal.toLocaleString()} ₽</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                            Поддержать проект
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="font-heading text-2xl">{project.title}</DialogTitle>
                            <DialogDescription>
                              Выберите сумму пожертвования
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                              {['500', '1000', '5000'].map((amount) => (
                                <Button
                                  key={amount}
                                  variant="outline"
                                  onClick={() => handleDonation(amount)}
                                  className="h-16 text-lg font-semibold hover:bg-primary hover:text-white"
                                >
                                  {amount} ₽
                                </Button>
                              ))}
                            </div>
                            <Input
                              type="number"
                              placeholder="Своя сумма"
                              value={donationAmount}
                              onChange={(e) => setDonationAmount(e.target.value)}
                            />
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12"
                              onClick={() => donationAmount && handleDonation(donationAmount)}
                            >
                              Перейти к оплате
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-4xl font-bold text-center mb-12">Новости и отчёты</h3>
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="news" className="text-lg">Новости</TabsTrigger>
                <TabsTrigger value="reports" className="text-lg">Отчёты</TabsTrigger>
              </TabsList>
              <TabsContent value="news" className="space-y-6">
                {news.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-heading text-xl mb-2">{item.title}</CardTitle>
                          <CardDescription className="text-base">{item.content}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="mt-2 w-fit">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {item.date}
                      </Badge>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="reports" className="space-y-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Финансовый отчёт за сентябрь 2024</CardTitle>
                    <CardDescription className="text-base">
                      Полный отчёт о поступлениях и расходовании средств за период
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Пожертвования</span>
                        <span className="font-semibold">3,450,000 ₽</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Помощь военным</span>
                        <span className="font-semibold text-primary">2,100,000 ₽</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Поддержка ветеранов</span>
                        <span className="font-semibold text-primary">890,000 ₽</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Административные расходы</span>
                        <span className="font-semibold">120,000 ₽</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать полный отчёт
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" className="text-white" size={20} />
                </div>
                <span className="font-heading text-xl font-bold">За Родину</span>
              </div>
              <p className="text-white/70 text-sm">
                Волонтёрское движение помощи защитникам Отечества
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Проекты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Волонтёры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отчёты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@zarodinu.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Россия
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Реквизиты</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
            © 2024 За Родину. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
