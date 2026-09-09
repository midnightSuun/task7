import { getRouteApi } from "@tanstack/react-router"
import { CameraIcon } from "lucide-react"
import { useRef, useState, type ChangeEvent } from "react"

import { useMe } from "@/auth/get-me"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Form, FormInput } from "@/components/form"
import { FormButton } from "@/components/form/form-button"
import { z } from "zod"
import { useUser } from "../api/get-user"
import { useUpdateProfile } from "../api/update-profile"
import { useUploadAvatar } from "../api/upload-avatar"
import { UserAvatar } from "./user-avatar"
import { useDeleteAvatar } from "../api/delete-avatar"

const route = getRouteApi("/__protected/users/$userId_/edit")

const schema = z.object({
  displayName: z.string().min(1, "Display name is required"),
})

type FormData = z.infer<typeof schema>

export const UserProfileEdit = () => {
  const { userId } = route.useParams()
  const { data: user } = useUser(userId)
  const { data: me } = useMe()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { mutateAsync: uploadAvatar } = useUploadAvatar()
  const { mutateAsync: updateProfile } = useUpdateProfile()
  const { mutateAsync: deleteAvatar } = useDeleteAvatar()

  const isMe = me?.id === user.id

  const handleSave = async (data: FormData) => {
    await updateProfile({ body: data })
  }

  const handleChangePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    await uploadAvatar(
      // @ts-ignore formData is not typed
      { body: formData },
    )

    setIsSheetOpen(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDeleteAvatar = async () => {
    await deleteAvatar()
    setIsSheetOpen(false)
  }

  if (!isMe) return null

  return (
    <div className="flex flex-col items-center gap-6">
      <h1>Edit Profile</h1>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          nativeButton={false}
          render={
            <button
              type="button"
              className="group relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Edit profile photo"
            />
          }
        >
          <UserAvatar
            displayName={user.displayName}
            avatar={user.avatar}
            className="h-40 w-40"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <CameraIcon className="size-8 text-white" />
          </span>
        </SheetTrigger>

        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Edit photo</SheetTitle>
            <SheetDescription>
              Choose a new profile photo from your gallery.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button type="button" onClick={handleChangePhoto}>
              <CameraIcon />
              Change photo
            </Button>
            <Button variant="destructive" onClick={handleDeleteAvatar}>Remove current photo</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={handleFileChange}
        />

      <Form onSubmit={handleSave} validationSchema={schema} defaultValues={{ displayName: user.displayName }} className="flex flex-col items-center gap-2">
        <FormInput<FormData> name="displayName" type="text" placeholder="Enter your new username" />
        <FormButton>Save</FormButton>
      </Form>
    </div>
  )
}
