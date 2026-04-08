import { useTranslation } from "react-i18next";
import logoVerde from "@/assets/logo-zapper-verde.svg";

export default function WetScrubberAnimation() {
  const { t } = useTranslation();

  return (
    <div className="wet-scrubber-wrap">
      {/* Main visual scene */}
      <div className="ws-outer">
        <div className="ws-scene">
          {/* === LEFT: OVEN === */}
          <div className="ws-oven-wrap">
            <div className="ws-oven-label">{t("wetScrubber.ovenLabel")}</div>
            <div className="ws-oven">
              <div className="ws-oven-chimney" />
              <div className="ws-oven-body" />
              <div className="ws-oven-window">
                <div className="ws-flame" />
                <div className="ws-flame" />
                <div className="ws-flame" />
                <div className="ws-flame" />
              </div>
              <div className="ws-oven-leg" style={{ left: 22 }} />
              <div className="ws-oven-leg" style={{ right: 22 }} />
              <div className="ws-fume-cloud-wrap">
                <div className="ws-fume-cloud" />
                <div className="ws-fume-cloud" />
                <div className="ws-fume-cloud" />
              </div>
            </div>
          </div>

          {/* === DIRTY PIPE + ARROW === */}
          <div className="ws-pipe-dirty">
            <div className="ws-pipe-h">
              <div className="ws-pipe-fume" />
              <div className="ws-pipe-fume" />
              <div className="ws-pipe-fume" />
            </div>
          </div>
          <div className="ws-arrow-dirty">→</div>

          {/* === CENTER: MACHINE === */}
          <div className="ws-machine-wrap">
            <div className="ws-casing">
              <div className="ws-port-in" />
              <div className="ws-port-out" />

              <div className="ws-tank ws-t-left"><div className="ws-tank-shine" /></div>
              <div className="ws-tank ws-t-right"><div className="ws-tank-shine" /></div>

              <div className="ws-fume-zone">
                <div className="ws-int-fume" />
                <div className="ws-int-fume" />
                <div className="ws-int-fume" />
                <div className="ws-int-fume" />
              </div>

              <div className="ws-spray-zone">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="ws-drop" />
                ))}
              </div>

              <div className="ws-vapor-zone">
                <div className="ws-int-vapor" />
                <div className="ws-int-vapor" />
                <div className="ws-int-vapor" />
              </div>

              <div className="ws-hose" />

              <div className="ws-ctrl-panel">
                <img src={logoVerde} alt="ZAPPER®" className="ws-ctrl-logo" />
                <div className="ws-ctrl-led" />
                <div className="ws-ctrl-gauge">
                  <div className="ws-gauge-needle" />
                </div>
              </div>

              <div className="ws-pool">
                <div className="ws-pool-wave" />
                <div className="ws-pool-label">{t("wetScrubber.poolLabel")}</div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="ws-sediment" />
                ))}
              </div>
            </div>
          </div>

          {/* === CLEAN PIPE + ARROW === */}
          <div className="ws-arrow-clean">→</div>
          <div className="ws-pipe-clean">
            <div className="ws-pipe-h-clean">
              <div className="ws-pipe-steam-flow" />
              <div className="ws-pipe-steam-flow" />
              <div className="ws-pipe-steam-flow" />
            </div>
          </div>

          {/* === RIGHT: OUTPUT === */}
          <div className="ws-output-wrap">
            <div className="ws-clean-air-label">{t("wetScrubber.cleanAir")}</div>
            <div className="ws-steam-exit-wrap">
              <div className="ws-steam-cloud" />
              <div className="ws-steam-cloud" />
              <div className="ws-steam-cloud" />
              <div className="ws-steam-cloud" />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="ws-legend">
        <div className="ws-leg">
          <div className="ws-leg-dot" style={{ background: "#c77a3a" }} />
          <span>{t("wetScrubber.legendDirty")}</span>
        </div>
        <div className="ws-leg">
          <div className="ws-leg-dot" style={{ background: "#48cae4" }} />
          <span>{t("wetScrubber.legendWater")}</span>
        </div>
        <div className="ws-leg">
          <div className="ws-leg-dot" style={{ background: "#b0e8ff" }} />
          <span>{t("wetScrubber.legendClean")}</span>
        </div>
        <div className="ws-leg">
          <div className="ws-leg-dot" style={{ background: "#5a3a1a" }} />
          <span>{t("wetScrubber.legendWaste")}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="ws-steps">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="ws-step-card">
            <div className="ws-step-num">{n}</div>
            <div className="ws-step-icon">
              {["🪵", "➡️", "💧", "🪣", "🌫️"][n - 1]}
            </div>
            <div className="ws-step-title">{t(`wetScrubber.step${n}Title`)}</div>
            <div className="ws-step-desc">{t(`wetScrubber.step${n}Desc`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
