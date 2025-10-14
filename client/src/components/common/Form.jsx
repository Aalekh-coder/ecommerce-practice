import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {
    const renderInputByComponentType = (getControlItem) => {
        let element = null;

        const value = formData[getControlItem?.name] || ""

        switch (getControlItem?.componentType) {
            case "input":
                element = <Input name={getControlItem?.name} placeholder={getControlItem?.placeholder} id={getControlItem?.name} type={getControlItem?.type} value={value} onChange={e => setFormData({
                    ...formData, [getControlItem?.name]: e.target.value
                })} />
                break;

            case "select":
                element = <Select value={value} onValueChange={(value) => setFormData({
                    ...formData, [getControlItem?.name]: value
                })}>
                    <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder={getControlItem?.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem?.options && getControlItem?.options?.map((optionItem) => {
                                return <SelectItem key={optionItem?.id} value={optionItem?.id}>{optionItem?.label}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
                break;

            case "textarea":
                element = <Textarea value={value} onChange={e => setFormData({
                    ...formData, [getControlItem?.name]: e.target.value
                })} name={getControlItem?.name} placeholder={getControlItem?.placeholder} id={getControlItem?.id} type={getControlItem?.type} />
                break;

            default:
                element = <Input value={value} onChange={e => setFormData({
                    ...formData, [getControlItem?.name]: e.target.value
                })} name={getControlItem?.name} placeholder={getControlItem?.placeholder} id={getControlItem?.name} type={getControlItem?.type} />
                break;
        }
        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls?.map((controlItem) => {
                        return <div className="grid w-full gap-1.5 " key={controlItem?.name}>
                            <Label className={"mb-1 "}>{controlItem?.label}</Label>
                            {renderInputByComponentType(controlItem)}
                        </div>
                    })
                }
            </div>
            <Button type={'submit'}  className={'mt-2 w-full'}>{buttonText || "Submit"}</Button>
        </form>
    )
}

export default Form