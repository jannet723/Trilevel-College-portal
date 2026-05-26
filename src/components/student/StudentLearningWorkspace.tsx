import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  ListFilter,
  GraduationCap,
} from 'lucide-react';
import type { CatalogCourse } from '../../data/courses';
import type { CourseResource, CourseResourceType } from '../../types/courseResource';
import { groupResourcesByUnit } from '../../utils/courseResources';
import {
  loadViewedIds,
  markLearningStarted,
  saveViewedIds,
} from '../../utils/learningProgress';
import ResourceFileAttachment from '../course/ResourceFileAttachment';
import { getCourseIcon } from '../../utils/courseIcons';

type PathFilter = 'all' | CourseResourceType;

const typeLabels: Record<CourseResourceType, string> = {
  lesson: 'Lesson',
  note: 'Note',
};

interface StudentLearningWorkspaceProps {
  course: CatalogCourse;
  courseId: string;
  resources: CourseResource[];
}

const StudentLearningWorkspace = ({ course, courseId, resources }: StudentLearningWorkspaceProps) => {
  const CourseIcon = getCourseIcon(course.iconKey);
  const progress = course.progress ?? 0;

  const [filter, setFilter] = useState<PathFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(() => loadViewedIds(courseId));

  useEffect(() => {
    markLearningStarted(courseId);
  }, [courseId]);

  const units = useMemo(() => groupResourcesByUnit(resources), [resources]);

  const flatList = useMemo(() => {
    const list: CourseResource[] = [];
    units.forEach(({ items }) => {
      items.forEach((item) => {
        if (filter === 'all' || item.type === filter) list.push(item);
      });
    });
    return list;
  }, [units, filter]);

  const filteredUnits = useMemo(() => {
    if (filter === 'all') return units;
    return units
      .map(({ unit, items }) => ({
        unit,
        items: items.filter((i) => i.type === filter),
      }))
      .filter((u) => u.items.length > 0);
  }, [units, filter]);

  const selected = flatList.find((r) => r.id === selectedId) ?? null;
  const selectedIndex = selected ? flatList.findIndex((r) => r.id === selected.id) : -1;

  const selectResource = useCallback(
    (id: string) => {
      setSelectedId(id);
      setViewed((prev) => {
        const next = new Set(prev);
        next.add(id);
        saveViewedIds(courseId, next);
        return next;
      });
    },
    [courseId]
  );

  useEffect(() => {
    if (flatList.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !flatList.some((r) => r.id === selectedId)) {
      selectResource(flatList[0].id);
    }
  }, [flatList, selectedId, selectResource]);

  const goPrev = () => {
    if (selectedIndex > 0) selectResource(flatList[selectedIndex - 1].id);
  };

  const goNext = () => {
    if (selectedIndex >= 0 && selectedIndex < flatList.length - 1) {
      selectResource(flatList[selectedIndex + 1].id);
    }
  };

  const viewedInCourse = flatList.filter((r) => viewed.has(r.id)).length;

  return (
    <div className="learn-workspace">
      {/* Slim course strip */}
      <header className="learn-workspace__strip">
        <div className="learn-workspace__strip-main">
          <div className="learn-workspace__strip-icon">
            <CourseIcon size={20} strokeWidth={1.5} className="text-[#4a6a9b]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e]">
              {course.code} · {course.level}
            </p>
            <h2 className="home-display text-lg sm:text-xl text-[#2c2824] leading-snug truncate">
              {course.title}
            </h2>
          </div>
        </div>

        <div className="learn-workspace__strip-meta">
          <div className="learn-workspace__progress" title="Course progress">
            <span className="learn-workspace__progress-label">{progress}%</span>
            <div className="learn-workspace__progress-track">
              <div className="learn-workspace__progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="learn-workspace__meta-pills">
            <span>{flatList.length} materials</span>
            <span className="text-[#4a7c5e]">{viewedInCourse} opened</span>
          </div>
        </div>
      </header>

      {resources.length === 0 ? (
        <div className="learn-workspace__empty portal-panel portal-panel--solid rounded-2xl p-10 sm:p-14 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#f0ece6] flex items-center justify-center text-[#b0a89e]">
            <GraduationCap size={28} />
          </div>
          <h3 className="home-display text-xl text-[#2c2824] mb-2">Materials on the way</h3>
          <p className="text-sm text-[#6b645a] max-w-md mx-auto leading-relaxed">
            Your instructor has not uploaded content for this programme yet. Check back after your next
            class session.
          </p>
          <Link to="/student/my-courses" className="home-cta-ghost inline-flex mt-6">
            Back to My Courses
          </Link>
        </div>
      ) : (
        <div className="learn-workspace__split">
          {/* Learning path */}
          <aside className="learn-path" aria-label="Learning path">
            <div className="learn-path__head">
              <p className="learn-path__title">
                <ListFilter size={14} className="text-[#4a6a9b]" />
                Your path
              </p>
              <div className="learn-path__filters" role="tablist">
                {(
                  [
                    { id: 'all' as const, label: 'All' },
                    { id: 'lesson' as const, label: 'Lessons' },
                    { id: 'note' as const, label: 'Notes' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`learn-path__filter ${filter === tab.id ? 'learn-path__filter--on' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="learn-path__scroll scrollbar-none">
              {filteredUnits.length === 0 ? (
                <p className="text-sm text-[#9b9288] px-2 py-4">Nothing in this filter yet.</p>
              ) : (
                <ol className="learn-path__timeline">
                  {filteredUnits.map(({ unit, items }, unitIdx) => (
                    <li key={unit} className="learn-path__unit">
                      <p className="learn-path__unit-label">
                        <span className="learn-path__unit-num">{unitIdx + 1}</span>
                        {unit}
                      </p>
                      <ul className="learn-path__items">
                        {items.map((resource) => {
                          const isActive = resource.id === selectedId;
                          const isViewed = viewed.has(resource.id);
                          const Icon = resource.type === 'lesson' ? BookOpen : FileText;

                          return (
                            <li key={resource.id}>
                              <button
                                type="button"
                                onClick={() => selectResource(resource.id)}
                                className={`learn-path__item ${isActive ? 'learn-path__item--active' : ''}`}
                                aria-current={isActive ? 'true' : undefined}
                              >
                                <span
                                  className={`learn-path__item-marker ${isViewed ? 'learn-path__item-marker--done' : ''}`}
                                  aria-hidden
                                >
                                  {isViewed ? (
                                    <Check size={10} strokeWidth={2.5} className="text-white" />
                                  ) : (
                                    <Circle size={8} className="text-[#c0b8ae]" />
                                  )}
                                </span>
                                <span className="min-w-0 flex-1 text-left">
                                  <span className="learn-path__item-type">{typeLabels[resource.type]}</span>
                                  <span className="learn-path__item-title">{resource.title}</span>
                                </span>
                                <Icon size={14} className="shrink-0 opacity-40" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </aside>

          {/* Reader */}
          <section className="learn-reader" aria-label="Study content">
            {selected ? (
              <>
                <div className="learn-reader__head">
                  <div>
                    <span
                      className={`learn-reader__badge learn-reader__badge--${selected.type}`}
                    >
                      {typeLabels[selected.type]}
                    </span>
                    <h3 className="learn-reader__title">{selected.title}</h3>
                    <p className="learn-reader__meta">
                      {selected.unit} · Updated{' '}
                      {new Date(selected.updatedAt).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="learn-reader__body scrollbar-none">
                  {selected.content.trim() ? (
                    <article className="learn-reader__prose">
                      <p className="whitespace-pre-wrap">{selected.content}</p>
                    </article>
                  ) : (
                    <p className="text-sm text-[#9b9288] italic px-1">
                      No written notes for this item — use the attachment below if available.
                    </p>
                  )}
                  {selected.file && <ResourceFileAttachment file={selected.file} />}
                </div>

                <footer className="learn-reader__nav">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={selectedIndex <= 0}
                    className="learn-reader__nav-btn"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <span className="learn-reader__nav-count">
                    {selectedIndex + 1} of {flatList.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={selectedIndex >= flatList.length - 1}
                    className="learn-reader__nav-btn learn-reader__nav-btn--primary"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </footer>
              </>
            ) : (
              <div className="learn-reader__placeholder">
                <BookOpen size={32} className="text-[#c0b8ae] mb-3" />
                <p className="text-sm text-[#6b645a]">Select a material from your path to start studying.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default StudentLearningWorkspace;
