"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  return (
      <div className="min-h-screen">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="flex flex-col items-center space-y-4 text-center px-4 md:px-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Projects with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  PFK Task simplifies project management and task tracking. Stay organized, collaborate effortlessly,
                  and boost productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-primary text-primary-foreground" size="lg">Get Started</Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </section>
          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {title: "Create Projects", description: "Set up your project and invite team members."},
                  {title: "Assign Tasks", description: "Break down projects into manageable tasks and assign them."},
                  {title: "Track Progress", description: "Monitor task completion and project milestones in real-time."}
                ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div
                          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Alex Johnson", role: "Project Manager", quote: "PFK Task has revolutionized how we manage projects. It's intuitive and powerful." },
                  { name: "Sarah Lee", role: "Team Lead", quote: "The real-time collaboration features have greatly improved our team's productivity." },
                  { name: "Michael Chen", role: "Freelancer", quote: "As a freelancer, PFK Task helps me stay organized and meet all my deadlines." }
                ].map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                      <p className="text-gray-500 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                ))}
              </div>
            </div>
          </section>
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { name: "Basic", price: "$9", features: ["Up to 5 projects", "Basic task management", "1 GB storage"] },
                  { name: "Pro", price: "$19", features: ["Unlimited projects", "Advanced task management", "10 GB storage", "Priority support"] },
                  { name: "Enterprise", price: "Custom", features: ["Custom solutions", "Dedicated account manager", "Onboarding support", "24/7 phone support"] }
                ].map((plan, index) => (
                    <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-4">{plan.price}</div>
                      <ul className="mb-6 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                              {feature}
                            </li>
                        ))}
                      </ul>
                      <Button className="w-full">Choose Plan</Button>
                    </div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                  <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                    Join thousands of teams already using PFK Task to streamline their projects.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Button className="w-full bg-background text-primary" size="lg">Start Your Free Trial</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 PFK Task. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
  )
}

