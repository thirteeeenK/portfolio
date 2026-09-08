import { useEffect, useState } from "react"
import Section from "../Section/Section"
import { projects } from "../../data/projects"
import TechIcon from "../TechIcon/TechIcon"
import { AnimatePresence, motion } from "framer-motion"
import "./Projects.css"

const VIDEO_EXT = /\.(mp4|webm|mov|ogg)(\?.*)?$/i

function isVideoDemo(url: string) {
  return VIDEO_EXT.test(url)
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [activeVideo])

  const liveIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )

  return (
    <Section id="projects" title="Projects" subtitle="Things I've built" background="dark">
      <div className="projects">
        {featured.map((project, i) => (
          <motion.article
            key={project.id}
            className="projects__card projects__card--featured"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="projects__card-body">
              <div className="projects__meta">
                <span className="projects__index">{String(i + 1).padStart(2, "0")}</span>
                {project.category && (
                  <span className="projects__badge">{project.category}</span>
                )}
              </div>
              <h3 className="projects__title">{project.title}</h3>
              <p className="projects__description">{project.description}</p>
              <div className="projects__footer">
                <div className="projects__techs">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="projects__tech">
                      <TechIcon name={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="projects__links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects__link">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Code
                    </a>
                  )}
                  {project.liveUrl &&
                    (isVideoDemo(project.liveUrl) ? (
                      <button
                        type="button"
                        className="projects__link projects__link--live"
                        onClick={() => setActiveVideo(project.liveUrl!)}
                      >
                        {liveIcon}
                        Live Demo
                      </button>
                    ) : (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projects__link projects__link--live">
                        {liveIcon}
                        Live Demo
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {others.length > 0 && (
          <>
            <h3 className="projects__subheading">More Projects</h3>
            <div className="projects__grid">
              {others.map((project, i) => (
                <motion.article
                  key={project.id}
                  className="projects__card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: "50px" }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <div className="projects__card-body">
                    {project.category && (
                      <span className="projects__badge">{project.category}</span>
                    )}
                    <h3 className="projects__title">{project.title}</h3>
                    <p className="projects__description">{project.description}</p>
                    <div className="projects__footer">
                      <div className="projects__techs">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="projects__tech">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="projects__links">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects__link">
                            Code
                          </a>
                        )}
                        {project.liveUrl &&
                          (isVideoDemo(project.liveUrl) ? (
                            <button
                              type="button"
                              className="projects__link projects__link--live"
                              onClick={() => setActiveVideo(project.liveUrl!)}
                            >
                              Live Demo
                            </button>
                          ) : (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projects__link projects__link--live">
                              Live Demo
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Video demo"
            onClick={() => setActiveVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="video-modal__card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="video-modal__close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <video src={activeVideo} controls autoPlay playsInline />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
