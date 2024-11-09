"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Coins, Lock, Timer, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const tokenFormSchema = z.object({
  name: z.string().min(1, "Token name is required"),
  symbol: z.string().min(1, "Token symbol is required"),
  decimals: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(0).max(18)
  ),
  totalSupply: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(1)
  ),
  rate: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(1)
  ),
  vestingPeriod: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(0)
  ),
  softCap: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(0)
  ),
  hardCap: z.string().regex(/^\d+$/).transform(Number).pipe(
    z.number().min(1)
  ),
});

export default function TokenSaleBuilder() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof tokenFormSchema>>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: "18",
      totalSupply: "1000000",
      rate: "1000",
      vestingPeriod: "180",
      softCap: "100",
      hardCap: "1000",
    },
  });

  function onSubmit(values: z.infer<typeof tokenFormSchema>) {
    toast({
      title: "Contract Configuration",
      description: "Your token sale contract configuration has been generated.",
    });
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Token Sale Contract Builder
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Create your custom ERC20 token sale smart contract with advanced features and security
          </p>
        </div>

        <Tabs defaultValue="basic" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Information</CardTitle>
                    <CardDescription>
                      Configure the basic parameters of your ERC20 token
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token Name</FormLabel>
                            <FormControl>
                              <Input placeholder="My Token" {...field} />
                            </FormControl>
                            <FormDescription>
                              The full name of your token
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token Symbol</FormLabel>
                            <FormControl>
                              <Input placeholder="MTK" {...field} />
                            </FormControl>
                            <FormDescription>
                              The trading symbol (3-4 characters)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="decimals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Decimals</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Number of decimal places (usually 18)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="totalSupply"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Supply</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Total number of tokens to mint
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>Sale Configuration</CardTitle>
                    <CardDescription>
                      Set up the parameters for your token sale
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token Rate</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Tokens per ETH
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vestingPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vesting Period (days)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Token lock period after sale
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="softCap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Soft Cap (ETH)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Minimum goal for the sale
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hardCap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hard Cap (ETH)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maximum amount to raise
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">ERC20 Standard</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Full ERC20 compliance
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Security</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      OpenZeppelin audited
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Vesting</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Customizable periods
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Whitelist</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      KYC support ready
                    </p>
                  </Card>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Generate Contract
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
}