"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./CarouselControls";
import { usePrevNextButtons } from "@/lib/hooks/useCarouselHooks";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: false,
    dragFree: false,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (!products.length) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Produtos Similares</h2>
        <div className="hidden md:flex items-center gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla overflow-hidden -mx-2" ref={emblaRef}>
        <div className="embla__container flex">
          {products.map((product) => (
            <div
              className="embla__slide px-2 aspect-auto w-[250px] max-w-[350px] max-h-[550px] flex-shrink-0"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
