"use client";

type HeaderProps = {
  title: string;
  subtitle?: string;
  theme?: "blue" | "dark" | "light";
  size?: "sm" | "md" | "lg";
};

export default function HeaderHomePageMenu({
  title,
  subtitle,
  theme = "blue",
  size = "md",
}: HeaderProps) {
  const themeClasses = {
    blue: {
      background: "bg-gradient-to-br from-[#143d66] via-[#1e4a7a] to-[#0f2d4d]",
      overlay:
        "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]",
      text: "text-white",
      subtitle: "text-white/90",
      accent: "bg-white/90",
    },
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      overlay:
        "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]",
      text: "text-white",
      subtitle: "text-gray-300",
      accent: "bg-blue-400",
    },
    light: {
      background: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
      overlay:
        "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]",
      text: "text-gray-900",
      subtitle: "text-gray-600",
      accent: "bg-blue-600",
    },
  };

  const sizeClasses = {
    sm: {
      container: "py-4 sm:py-6",
      title: "text-xl sm:text-3xl md:text-2xl",
      subtitle: "text-sm sm:text-base",
      accent: "h-[2px] w-16 sm:w-20",
    },
    md: {
      container: "py-6 sm:py-6 md:py-4",
      title: "text-2xl sm:text-4xl md:text-5xl lg:text-4xl",
      subtitle: "text-base sm:text-lg md:text-xl",
      accent: "h-[3px] w-20 sm:w-28 md:w-36",
    },
    lg: {
      container: "py-8 sm:py-16 md:py-20",
      title: "text-2xl sm:text-5xl md:text-2xl lg:text-2xl",
      subtitle: "text-lg sm:text-xl md:text-2xl",
      accent: "h-[4px] w-24 sm:w-32 md:w-40",
    },
  };

  const currentTheme = themeClasses[theme];
  const currentSize = sizeClasses[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center overflow-hidden ${currentSize.container}`}
    >
      <div className={`absolute inset-0 ${currentTheme.background}`} />
      <div className={`absolute inset-0 ${currentTheme.overlay}`} />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500" />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1
          className={`${currentSize.title} font-bold tracking-tight ${currentTheme.text} drop-shadow-2xl leading-tight`}
        >
          <span className="bg-clip-text bg-gradient-to-r from-current to-current/80">
            {title}
          </span>
          <div className="border-b-2 pt-2 border-white"></div>
        </h1>

        {subtitle && (
          <p
            className={`mt-4 ${currentSize.subtitle} ${currentTheme.subtitle} font-medium leading-relaxed max-w-2xl mx-auto`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
