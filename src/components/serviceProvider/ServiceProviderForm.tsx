import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL.",
  }),
  specialties: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one specialty.",
  }),
  location: z.object({
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    state: z.string().min(2, {
      message: "State must be at least 2 characters.",
    }),
    zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, {
      message: "Please enter a valid zip code.",
    }),
  }),
  services: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Service name must be at least 2 characters.",
      }),
      description: z.string().min(10, {
        message: "Service description must be at least 10 characters.",
      }),
      price: z.string().refine((value) => {
        const numValue = Number(value);
        return !isNaN(numValue) && numValue > 0;
      }, {
        message: "Price must be a valid number greater than 0.",
      }),
    })
  ),
  hours: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
  }),
  verified: z.boolean().default(false).optional(),
});

type ServiceProviderFormValues = z.infer<typeof formSchema>;

const timeFields = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const ServiceProviderForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<ServiceProviderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      specialties: [],
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      services: [{ name: "", description: "", price: "" }],
      hours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      verified: false,
    },
    mode: "onChange",
  });

  function onSubmit(values: ServiceProviderFormValues) {
    axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers`, values)
      .then(response => {
        if (response.data.success) {
          toast({
            title: "Success",
            description: "Service provider created successfully!",
          });
          navigate('/service-providers');
        } else {
          toast({
            title: "Error",
            description: response.data.message || "Failed to create service provider.",
            variant: "destructive",
          });
        }
      })
      .catch(error => {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to create service provider.",
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Service Provider Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your service"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Specialties */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Specialties</h3>
          <FormField
            control={form.control}
            name="specialties"
            render={() => (
              <FormItem>
                <FormLabel>Select Specialties</FormLabel>
                <div className="flex flex-wrap gap-2">
                  <FormField
                    control={form.control}
                    name="specialties"
                    render={({ field }) => {
                      const handleCheckboxChange = (value: string) => {
                        if (field.value?.includes(value)) {
                          field.onChange(field.value.filter((v: string) => v !== value));
                        } else {
                          field.onChange([...(field.value || []), value]);
                        }
                      };

                      return (
                        <>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mechanic"
                              checked={field.value?.includes("mechanic")}
                              onCheckedChange={() => handleCheckboxChange("mechanic")}
                            />
                            <Label htmlFor="mechanic">Mechanic</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="bodyShop"
                              checked={field.value?.includes("bodyShop")}
                              onCheckedChange={() => handleCheckboxChange("bodyShop")}
                            />
                            <Label htmlFor="bodyShop">Body Shop</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="inspectionService"
                              checked={field.value?.includes("inspectionService")}
                              onCheckedChange={() => handleCheckboxChange("inspectionService")}
                            />
                            <Label htmlFor="inspectionService">Inspection Service</Label>
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location Information</h3>
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Services</h3>
          {form.watch("services")?.map((_, index) => (
            <div key={index} className="space-y-2 border p-4 rounded">
              <FormField
                control={form.control}
                name={`services.${index}.name` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Service Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.description` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Service Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.price` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Business Hours</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeFields.map((field) => (
              <div key={field.key} className="flex flex-col space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  placeholder={`e.g. 9:00 AM - 5:00 PM or "Closed"`}
                  {...form.register(`hours.${field.key}` as const)}
                  className={
                    form.formState.errors.hours && form.formState.errors.hours[field.key as keyof typeof form.formState.errors.hours]
                      ? "border-red-500"
                      : ""
                  }
                />
                {form.formState.errors.hours && form.formState.errors.hours[field.key as keyof typeof form.formState.errors.hours] && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.hours[field.key as keyof typeof form.formState.errors.hours]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ServiceProviderForm;
