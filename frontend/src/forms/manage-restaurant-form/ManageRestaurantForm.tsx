import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import DetailsSection from './DetailsSection';
const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({ invalid_type_error: "must be a valid number", required_error: "Delivery price is required" }), 
    estimatedDeliveryTime: z.coerce.number({ invalid_type_error: "must be a valid number", required_error: "Estimated delivery time is required" }),    
    cuisines: z.array(z.string({
        required_error: "Cuisines are required"
    })),
    menuItems: z.array(z.object({
        name: z.string({
            required_error: "Menu item name is required"
        }),
        price: z.coerce.number({ invalid_type_error: "must be a valid number", required_error: "Menu item price is required" })
    })),
    imageFile: z.instanceof(File, { message: "Image file is required" })
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: '',
            city: '',
            country: '',
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: '', price: 0 }],
        }
    })
    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();
        formData.append('restaurantName', formDataJson.restaurantName);
        formData.append('city', formDataJson.city);
        formData.append('country', formDataJson.country);
        formData.append('deliveryPrice', formDataJson.deliveryPrice.toString());
        formData.append('estimatedDeliveryTime', formDataJson.estimatedDeliveryTime.toString());
        formData.append('cuisines', JSON.stringify(formDataJson.cuisines));
        formData.append('menuItems', JSON.stringify(formDataJson.menuItems));
        formData.append('imageFile', formDataJson.imageFile);
        onSave(formData);
    }
    return (
        <Form { ...form }>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;