"use client";

import MyButton from "@/components/ui/MyButton/MyButton";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";

const categorySchema = z.object({
  name: z.string({ required_error: "Category name is required" }),
});

export default function PostCategories() {
  const handleSubmit = async (data: { name: string }, reset: () => void) => {
    try {
      console.log("Category Data:", data); 
      toast.success("Category submitted successfully!");
      reset();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to submit category.");
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-primary">Add Category</h2>

        <MyFormWrapper
          resolver={zodResolver(categorySchema)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <MyFormInput name="name" placeHolder="Category Name" type="text" />
          <MyButton type="submit" label="Submit" fullWidth />
        </MyFormWrapper>
      </div>
    </div>
  );
}
