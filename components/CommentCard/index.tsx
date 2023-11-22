"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, User2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, useReducer } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Input } from "../ui/input";

const EditCommentSchema = z.object({
  nick: z.string().min(1),
});

const reducer = (
  state: {
    openEditDialog: boolean;
    openDeleteDialog: boolean;
  },
  action: { type: string },
) => {
  switch (action.type) {
    case "OpenEditDialog":
      return {
        ...state,
        openEditDialog: true,
      };
    case "CloseEditDialog":
      return {
        ...state,
        openEditDialog: false,
      };
    case "OpenDeleteDialog":
      return {
        ...state,
        openDeleteDialog: true,
      };
    case "CloseDeleteDialog":
      return {
        ...state,
        openDeleteDialog: false,
      };
    default:
      return state;
  }
};

const CommentCard: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    openEditDialog: false,
    openDeleteDialog: false,
  });

  return (
    <>
      <div className="rounded-lg border">
        <div className="flex flex-col">
          <Link
            href="/"
            className="border-b bg-gray-100 px-4 py-6 hover:underline hover:underline-offset-4"
          >
            # 1696695549113
          </Link>
          <div className="border-b px-4 py-4">
            <div className="flex items-center divide-x">
              <div className="flex items-center space-x-2 overflow-hidden pr-2">
                <User2 className="h-5 w-5 shrink-0" />{" "}
                <span className="line-clamp-1 text-sm text-red-500">
                  GinMiraing
                </span>
              </div>
              <div className="flex items-center space-x-2 overflow-hidden pl-2">
                <Calendar className="h-5 w-5 shrink-0" />{" "}
                <span className="line-clamp-1 text-sm">
                  2023-01-01 00:00:00
                </span>
              </div>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="my-6 line-clamp-2 hover:cursor-pointer hover:underline hover:underline-offset-4">
                  Content Content Content Content Content Content Content
                  Content Content Content Content Content Content Content
                </p>
              </HoverCardTrigger>
              <HoverCardContent>This is comment content</HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="flex justify-end space-x-2 bg-gray-50 px-4 py-4">
          <Button
            onClick={() => dispatch({ type: "OpenEditDialog" })}
            className="bg-blue-400 text-white hover:bg-blue-500"
          >
            Edit
          </Button>
          <Button
            onClick={() => dispatch({ type: "OpenDeleteDialog" })}
            className="bg-red-400 text-white hover:bg-red-500"
          >
            Delete
          </Button>
        </div>
      </div>
      <EditDialog
        open={state.openEditDialog}
        setOpen={dispatch}
      />
      <DeleteDialog
        open={state.openDeleteDialog}
        setOpen={dispatch}
      />
    </>
  );
};

const EditDialog: React.FC<{
  open: boolean;
  setOpen: Dispatch<{ type: string }>;
}> = ({ open, setOpen }) => {
  const form = useForm<z.infer<typeof EditCommentSchema>>({
    resolver: zodResolver(EditCommentSchema),
    defaultValues: {
      nick: "ABC",
    },
  });

  const onSubmit = (values: z.infer<typeof EditCommentSchema>) => {
    console.log(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen({ type: "CloseEditDialog" });
        } else {
          setOpen({ type: "OpenEditDialog" });
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nick"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nick</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors?.nick?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-6 bg-blue-400 text-white hover:bg-blue-500"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteDialog: React.FC<{
  open: boolean;
  setOpen: Dispatch<{ type: string }>;
}> = ({ open, setOpen }) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen({ type: "CloseDeleteDialog" });
        } else {
          setOpen({ type: "OpenDeleteDialog" });
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-400 text-white hover:bg-red-500">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommentCard;
