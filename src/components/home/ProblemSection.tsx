import { CloudOff, Users, FileWarning, Ban } from "lucide-react";
import { useTranslation } from "react-i18next";
import problemBg from "@/assets/problem-bg.webp";

const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    { icon: CloudOff, title: t("problem.visibleSmoke"), description: t("problem.visibleSmokeDesc") },
    { icon: Users, title: t("problem.neighborComplaints"), description: t("problem.neighborComplaintsDesc") },
    { icon: FileWarning, title: t("problem.aslControls"), description: t("problem.aslControlsDesc") },
    { icon: Ban, title: t("problem.fines"), description: t("problem.finesDesc") },
  ];

  return (
    <section className="py-12 md:py-24 overflow-hidden relative" style={{ backgroundImage: `url(${problemBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-foreground/80" />
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">{t("problem.label")}</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t("problem.title1")}{" "}
              <span className="text-primary">{t("problem.title2")}</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">{t("problem.description")}</p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl">
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{t("problem.stat1Value")}</p>
                <p className="text-xs sm:text-sm text-white/70">{t("problem.stat1")}</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{t("problem.stat2Value")}</p>
                <p className="text-xs sm:text-sm text-white/70">{t("problem.stat2")}</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{t("problem.stat3Value")}</p>
                <p className="text-xs sm:text-sm text-white/70">{t("problem.stat3")}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {problems.map((problem, index) => (
              <div key={problem.title} className={`group p-4 sm:p-5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:border-primary/30 hover:bg-white/15 transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/30 transition-colors">
                  <problem.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">{problem.title}</h3>
                <p className="text-xs sm:text-sm text-white/70">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
