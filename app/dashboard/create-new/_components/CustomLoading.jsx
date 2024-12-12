import React from 'react'
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
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

function CustomLoading({loading}) {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent>
    <div className='flex flex-col items-center my-10 justify-center '>
        <Image alt="loader" src={'/loader.gif'} width={100} height={100} />
        <h2>Generating Your AI Video...Please don't reload....</h2>
    </div>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CustomLoading
