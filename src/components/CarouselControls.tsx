"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ComponentPropsWithoutRef } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Tipo para os botões de Próximo/Anterior
type PrevNextButtonPropType = {
  disabled: boolean;
  onClick: () => void;
};

// Tipo para os botões "Dot"
type DotButtonPropType = ComponentPropsWithoutRef<"button">;

/**
 * Componente para o botão "Dot" de navegação.
 * É um botão simples cuja aparência é definida pelo componente pai.
 */
export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { className, ...restProps } = props;
  return (
    <button
      type="button"
      className={cn("embla__dot", className)}
      {...restProps}
    />
  );
};

/**
 * Componente de Botão "Anterior" adaptado para shadcn/ui.
 */
export const PrevButton: React.FC<PrevNextButtonPropType> = ({
  disabled,
  onClick,
}) => {
  return (
    <Button
      className="embla__button embla__button--prev"
      onClick={onClick}
      disabled={disabled}
      size="icon"
      variant="ghost"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  );
};

/**
 * Componente de Botão "Próximo" adaptado para shadcn/ui.
 */
export const NextButton: React.FC<PrevNextButtonPropType> = ({
  disabled,
  onClick,
}) => {
  return (
    <Button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={disabled}
      size="icon"
      variant="ghost"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  );
};
