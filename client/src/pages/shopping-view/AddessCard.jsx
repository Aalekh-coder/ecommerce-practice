import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddessCard = ({addressInfo,handleDeleteAddress,handleEdit}) => {
  return (
    <Card className=''>
        <CardContent className={"grid gap-4 p-4"}>
            <Label>Address: {addressInfo?.address}</Label>
            <Label>City: {addressInfo?.city}</Label>
            <Label>Pincode: {addressInfo?.pincode}</Label>
            <Label>Phone: {addressInfo?.phone}</Label>
            <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className={"flex justify-between p-4"}>
            <Button onClick={()=>handleEdit(addressInfo)}>Edit</Button>
            <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddessCard