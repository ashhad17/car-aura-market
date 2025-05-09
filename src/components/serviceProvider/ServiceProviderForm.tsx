
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {jwtDecode} from "jwt-decode";
import uploadToCloudinary from "../../hooks/cloudinary";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import { services } from "@/lib/data";

const serviceProviderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }),
  hours: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
  }),
  image: z.string().url("Please enter a valid URL").optional(),
  gallery: z.array(z.string().url("Please enter valid URLs")).optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
});

type ServiceProviderFormValues = z.infer<typeof serviceProviderSchema>;

interface ServiceProviderFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const ServiceProviderForm: React.FC<ServiceProviderFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
  isEdit = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const { toast } = useToast();
 
  // Parse initial data or set defaults
  const defaultValues: Partial<ServiceProviderFormValues> = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: {
      address: initialData?.location?.address || "",
      city: initialData?.location?.city || "",
      state: initialData?.location?.state || "",
      zipCode: initialData?.location?.zipCode || "",
    },
    hours: initialData?.hours || {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    image: initialData?.image || "",
    gallery: initialData?.gallery || [],
    website: initialData?.website || "",
    specialties: initialData?.specialties || [],
  };
  

  const form = useForm<ServiceProviderFormValues>({
    resolver: zodResolver(serviceProviderSchema),
    defaultValues,
  });

  const handleAddSpecialty = () => {
    if (specialtyInput.trim()) {
      const currentSpecialties = form.getValues("specialties") || [];
      if (!currentSpecialties.includes(specialtyInput.trim())) {
        form.setValue("specialties", [...currentSpecialties, specialtyInput.trim()]);
      }
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const currentSpecialties = form.getValues("specialties");
    form.setValue(
      "specialties",
      currentSpecialties.filter((item) => item !== specialty)
    );
  };

  const onSubmit = async (data: ServiceProviderFormValues) => {
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      // Decode the token to get the user ID
      const decodedToken: { id: string } = jwtDecode(token);
      const userId = decodedToken.id;
  
      if (!userId) {
        throw new Error("User ID not found in token");
      }
  
      const updatedData = {
        ...initialData,
        ...data,
        user: userId, // Include the current user's ID
        location: {
          ...initialData?.location,
          ...data.location,
        },
        services: [],
        hours: {
          ...initialData?.hours,
          ...data.hours,
        },
      };
  
      console.log("Updated Data:", updatedData);
  
      const url = isEdit && initialData?._id
        ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/service-providers/${initialData._id}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/service-providers`;
  
      const method = isEdit ? axios.put : axios.post;
  
      const response = await method(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        toast({
          title: isEdit ? "Service Provider Updated" : "Service Provider Created",
          description: isEdit
            ? "The service provider has been successfully updated."
            : "The service provider has been successfully created.",
        });
  
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the services and specialties offered" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Specialties</FormLabel>
          <div className="flex gap-2">
            <Input
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              placeholder="Add a specialty (e.g., Oil Change, Brake Service)"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddSpecialty}>Add</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("specialties")?.map((specialty) => (
              <div key={specialty} className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                {specialty}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSpecialty(specialty)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {form.formState.errors.specialties && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.specialties.message}
            </p>
          )}
        </div>
        <div className="space-y-3">
  <h3 className="font-medium">Working Hours</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.keys(defaultValues.hours || {}).map((day) => (
      <FormField
        key={day}
        control={form.control}
        name={`hours.${day}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{day.charAt(0).toUpperCase() + day.slice(1)}</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 9:00 AM - 5:00 PM" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </div>
</div>
        <div className="space-y-3">
          <h3 className="font-medium">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        <div className="space-y-3">
  <h3 className="font-medium">Image</h3>
  <FormField
    control={form.control}
    name="image"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Service Provider Image</FormLabel>
        <FormControl>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                const uploadedImage = await uploadToCloudinary(e.target.files[0]);
                form.setValue("image", uploadedImage.url);
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

<div className="space-y-3">
  <h3 className="font-medium">Gallery</h3>
  <FormField
    control={form.control}
    name="gallery"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Gallery Images</FormLabel>
        <FormControl>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={async (e) => {
              if (e.target.files) {
                const uploadedImages = await Promise.all(
                  Array.from(e.target.files).map((file) => uploadToCloudinary(file))
                );
                form.setValue("gallery", uploadedImages.map((img) => img.url));
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : isEdit ? (
              "Update Service Provider"
            ) : (
              "Create Service Provider"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceProviderForm;
