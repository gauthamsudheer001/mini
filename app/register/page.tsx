import { DonorRegistrationForm } from "@/components/donor-registration-form"

export default function RegisterPage() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <DonorRegistrationForm />
      </div>
    </section>
  )
}
