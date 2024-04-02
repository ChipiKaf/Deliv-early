import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">
                Cuisines
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </h2>
        </div>
        <FormField control={control} name="cuisines" render={({ field }) => (
            <FormItem>
            <div className="grid md:grid-cols-5 gap-1">{cuisineList.map((cuisine) => <CuisineCheckbox cuisine={cuisine} field={field} />)}</div>
            <FormItem />
            </FormItem>
        )} />
    </div>
  )
}

export default CuisinesSection;