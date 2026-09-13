import { UsersList } from "./users-list"

export const UsersPage = () => {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <header className="space-y-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                    People
                </h1>
                <p className="text-sm text-muted-foreground">
                    Find someone to follow or message
                </p>
            </header>
            <UsersList />
        </div>
    )
}
