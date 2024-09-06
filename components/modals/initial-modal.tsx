"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "../file-upload";
import axiosInstance from "@/config/axiosConfig";
import { serverApi } from "@/config/apiConfig";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

const formSchema = z.object({
  imageUrl: z
    .string()
    .url({
      message: "Invalid URL",
    })
    .trim()
    .min(1, { message: "Image url can't be empty" }),
  serverName: z
    .string()
    .trim()
    .min(3, { message: "Server name have at least 3 characters" }),
});

interface InitialModalProps {
  userId: string;
}

const InitialModal = (props: InitialModalProps): React.ReactNode => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      serverName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    try {
      console.log("calling create server api ");
      const response: AxiosResponse = await axiosInstance.post(serverApi, {
        ...values,
        userId: props.userId,
      });
      console.log(response);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Create your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 ">
            Give your server name and personality which you can change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name={"imageUrl"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endPoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="serverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold text-xs uppercase text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={"primary"} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
