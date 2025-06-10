'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useDotButton, usePrevNextButtons } from '@/lib/hooks/carouselHooks';
import { DotButton, NextButton, PrevButton } from './CarouselControls';

interface ProductCardCarouselProps {
  gallery: string[];
  productName: string;
}

export function ProductCardCarousel({ gallery, productName }: ProductCardCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick, prevBtnDisabled, nextBtnDisabled } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla h-full w-full" ref={emblaRef}>
      <div className="embla__container h-full">
        {gallery.map((imgUrl, index) => (
          <div className="embla__slide relative h-full min-w-0 flex-[0_0_100%]" key={index}>
            <Image
              src={imgUrl}
              alt={`${productName} - imagem ${index + 1}`}
              fill
              className="w-full h-full object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* 1. ADICIONADO 'z-10' PARA TRAZER AS SETAS PARA FRENTE */}
      <div className="embla__buttons absolute inset-0 z-10 flex items-center justify-between px-1">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      {/* 2. ADICIONADO 'z-10' PARA TRAZER OS DOTS PARA FRENTE */}
      <div className="embla__dots absolute bottom-2 left-0 right-0 z-10 flex items-center justify-center gap-1">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`embla__dot h-2 w-2 rounded-full bg-primary/20 transition-all duration-300 ${
              index === selectedIndex ? 'w-4 bg-primary/50' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}