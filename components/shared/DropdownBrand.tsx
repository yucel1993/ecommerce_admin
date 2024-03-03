import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

import { IBrand } from "@/lib/database/models/brand.modal";
import {
  createBrand,
  getAllBrands,
} from "@/lib/database/actions/brand.actions ";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const DropdownBrand = ({ value, onChangeHandler }: DropdownProps) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [newBrand, setNewBrand] = useState("");

  const handleAddBrand = () => {
    createBrand({
      brandName: newBrand.trim(),
    }).then((brand) => {
      setBrands((prevState) => [...prevState, brand]);
    });
  };

  useEffect(() => {
    const getBrands = async () => {
      const brandList = await getAllBrands();

      brandList && setBrands(brandList as IBrand[]);
    };

    getBrands();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Brand" />
      </SelectTrigger>
      <SelectContent>
        {brands.length > 0 &&
          brands.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new brand
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Brand</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Brand name"
                  className="input-field mt-3"
                  onChange={(e) => setNewBrand(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddBrand)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropdownBrand;
