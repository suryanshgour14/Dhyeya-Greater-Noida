"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, Tag } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Cover */}
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-blue/5 to-brand-blue/10">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
              product.badge === "Bestseller"
                ? "bg-brand-orange/10 text-brand-orange"
                : "bg-brand-blue/10 text-brand-blue"
            }`}
          >
            {product.badge}
          </span>
        )}
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10">
          <Tag className="h-8 w-8 text-brand-blue" />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
          {discount}% OFF
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-0.5 text-[11px] text-muted-foreground">{product.author}</p>
        <h3 className="mb-3 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">₹{product.salePrice}</span>
            <span className="ml-2 text-xs text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-colors hover:bg-brand-blue hover:text-white">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DhyeyaStore() {
  const locale = useLocale();

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
        >
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
              Books &amp; Notes
            </span>
            <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
              Dhyeya Store
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Expert-authored books and notes, curated for UPSC aspirants. Trusted by 15,000+ students.
            </p>
          </div>
          <Link
            href={`/${locale}/store`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
          >
            View All Products
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Product grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
