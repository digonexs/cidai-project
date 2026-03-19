import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
  blob?: "none" | "left" | "right" | "center";
}

export function Section({ 
  children, 
  className, 
  containerClassName,
  blob = "none",
  ...props 
}: SectionProps) {
  return (
    <section 
      className={cn("py-24 relative overflow-hidden", className)} 
      {...props}
    >
      {blob === "left" && (
        <div className="bg-blob bg-[#1C3F3A] w-[500px] h-[500px] -left-48 top-0" />
      )}
      {blob === "right" && (
        <div className="bg-blob bg-[#458FF6] w-[600px] h-[600px] -right-32 top-20" />
      )}
      {blob === "center" && (
        <div className="bg-blob bg-[#EBE8D8] w-[800px] h-[800px] left-1/2 -translate-x-1/2 top-10" />
      )}
      
      <div className={cn("container mx-auto px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
