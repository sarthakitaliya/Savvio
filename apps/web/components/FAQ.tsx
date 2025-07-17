// components/FAQ.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Is Savvio free to use?",
    answer: "Yes! Savvio is completely free with no hidden costs.",
  },
  {
    question: "Do I need an account to use the extension?",
    answer:
      "Yes, creating an account lets you sync across devices and access your dashboard.",
  },
  {
    question: "How does Savvio work?",
    answer:
      "Install the extension, log in once, and start saving bookmarks and notes. Everything syncs with your dashboard instantly.",
  },
  {
    question: "Can I organize bookmarks into folders?",
    answer:
      "Absolutely. You can create and manage folders directly from the dashboard.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your data is never shared. It's securely stored and accessible only to you.",
  },
  {
    question: "Does it work across multiple browsers?",
    answer:
      "Currently, Savvio supports Chromium-based browsers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 shadow-sm bg-white"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="font-medium dark:text-black">{faq.question}</h3>
              <span className="text-xl dark:text-black">{openIndex === index ? "−" : "+"}</span>
            </div>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-2 text-sm text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
