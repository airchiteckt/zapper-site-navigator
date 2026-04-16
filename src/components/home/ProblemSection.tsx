import { Users, FileWarning, Ban } from "lucide-react";
import { useTranslation } from "react-i18next";
import problemBg from "@/assets/problem-bg.webp";

const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    { icon: Users, title: t("problem.neighborComplaints"), description: t("problem.neighborComplaintsDesc") },
    { icon: FileWarning, title: t("problem.aslControls"), description: t("problem.aslControlsDesc") },
    { icon: Ban, title: t("problem.fines"), description: t("problem.finesDesc") },
  ];

  return (
    <section className="py-12 md:py-20 overflow-hidden relative" style={{ backgroundImage: `url(${problemBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-foreground/80" />
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">{t("problem.label")}</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {t("problem.title1")}{" "}
            <span className="text-primary">{t("problem.title2")}</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80">{t("problem.description")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div key={problem.title} className={`group p-5 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-primary/30 hover:bg-white/15 transition-all duration-300 text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/30 transition-colors">
                <problem.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2 text-white">{problem.title}</h3>
              <p className="text-xs sm:text-sm text-white/70">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
