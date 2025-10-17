import ImageUpload from '@/components/admin-view/ImageUpload';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import React, { useState } from 'react'

const Product = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
  }
  const [formData, setFormdata] = useState(initialFormData);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  const onSubmit = () => { }
  return (
    <>
      <div className="mb-5 flex w-full justify-end ">
        <Button onClick={() => setOpenCreateProductDialog(true)}>Add new Product</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setOpenCreateProductDialog(false)
      }}>
        <SheetContent side="right" className={"overflow-auto"}>
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ImageUpload />
          <div className="px-6 ">
            <Form formControls={addProductFormElements} formData={formData} setFormData={setFormdata} buttonText={"Add"} onSubmit={onSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Product