import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import AdminProductTile from "@/components/admin-view/ProductTile";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/productSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [formData, setFormdata] = useState(initialFormData);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { isLoading, productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setFormdata(initialFormData);
              setOpenCreateProductDialog(false);
              setCurrentEditedId(null);
              toast.success("Product edit successfully");
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setImageFile(null);
            setFormdata(initialFormData);
            setOpenCreateProductDialog(false);
            toast.success("Product add Successfully");
          }
        });
  };

  return (
    <>
      <div className="mb-5 flex w-full justify-end ">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add new Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList?.map((productItem) => (
              <AdminProductTile
                key={productItem?._id}
                setFormData={setFormdata}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormdata(initialFormData);
        }}
      >
        <SheetContent side="right" className={"overflow-auto"}>
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            isEditMode={currentEditedId !== null}
            setCurrentEditedId={setCurrentEditedId}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="px-6 ">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormdata}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Product;
