import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, FileText, Layers, Clock, AlertCircle, Plus, Paperclip, ChevronDown } from 'lucide-react';
import type { CourseResource } from '../../types/courseResource';
import { groupResourcesByUnit, countByType } from '../../utils/courseResources';
import ResourceFileAttachment from './ResourceFileAttachment';

export type MaterialFilter = 'all' | 'lesson' | 'note';

interface CourseLearningMaterialsProps {
  resources: CourseResource[];
  mode: 'student' | 'admin';
  filter?: MaterialFilter;
  interactive?: boolean;
  onEdit?: (resource: CourseResource) => void;
  onDelete?: (resource: CourseResource) => void;
  onAddClick?: () => void;
}

const unitSectionId = (unit: string) =>
  `learn-unit-${unit.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

const typeMeta = {
  lesson: {
    label: 'Lesson',
    icon: BookOpen,
    badge: 'bg-[#e8f0fe] text-[#4a6a9b] border-[#d4e2f7]',
  },
  note: {
    label: 'Note',
    icon: FileText,
    badge: 'bg-[#fef5e8] text-[#9a7530] border-[#faeedc]',
  },
};

function MaterialCardHeader({
  resource,
  meta,
  Icon,
  isExpanded,
  showChevron,
  adminActions,
}: {
  resource: CourseResource;
  meta: (typeof typeMeta)['lesson'];
  Icon: LucideIcon;
  isExpanded: boolean;
  showChevron?: boolean;
  adminActions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${meta.badge}`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.badge}`}
            >
              {meta.label}
            </span>
            {resource.file && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-[#eef5f0] text-[#4a7c5e] border-[#ddebe2]">
                File attached
              </span>
            )}
          </div>
          <h4 className="font-semibold text-[#2c2824] text-base leading-snug">{resource.title}</h4>
          <p className="text-[10px] text-[#9b9288] mt-1 flex items-center gap-1">
            <Clock size={10} />
            Updated {new Date(resource.updatedAt).toLocaleDateString()}
            {showChevron && (
              <span className="ml-2 text-[#4a6a9b]">{isExpanded ? '· Tap to collapse' : '· Tap to open'}</span>
            )}
          </p>
        </div>
      </div>
      {showChevron && (
        <ChevronDown
          size={18}
          className={`text-[#9b9288] shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      )}
      {adminActions}
    </div>
  );
}

const CourseLearningMaterials = ({
  resources,
  mode,
  filter = 'all',
  interactive = false,
  onEdit,
  onDelete,
  onAddClick,
}: CourseLearningMaterialsProps) => {
  const filtered = useMemo(() => {
    if (filter === 'all') return resources;
    return resources.filter((r) => r.type === filter);
  }, [resources, filter]);

  const counts = countByType(resources);
  const grouped = groupResourcesByUnit(filtered);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!interactive || grouped.length === 0) return;
    setOpenUnits((prev) => {
      const next = { ...prev };
      grouped.forEach(({ unit }, i) => {
        if (next[unit] === undefined) next[unit] = i === 0;
      });
      return next;
    });
  }, [interactive, resources, filter]);

  const toggleUnit = (unit: string) => {
    setOpenUnits((prev) => ({ ...prev, [unit]: !prev[unit] }));
  };

  const toggleResource = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d4cfc8] bg-white/50 p-10 sm:p-12 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#f0ece6] flex items-center justify-center text-[#b0a89e]">
          <AlertCircle size={26} />
        </div>
        <h3 className="text-lg font-semibold text-[#2c2824] mb-2">
          {mode === 'student' ? 'Learning materials coming soon' : 'No materials added yet'}
        </h3>
        <p className="text-sm text-[#6b645a] max-w-md mx-auto leading-relaxed mb-6">
          {mode === 'student'
            ? 'No materials have been uploaded for this course yet. Your instructor adds files from Upload Materials — they will show here when published.'
            : 'Upload materials from the Upload Materials page so enrolled students can access them on their course page.'}
        </p>
        {mode === 'admin' && onAddClick && (
          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a6a9b] text-white text-sm font-medium hover:shadow-md transition"
          >
            <Plus size={16} />
            Add first material
          </button>
        )}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="learn-filter-empty rounded-2xl border border-dashed border-[#d4cfc8] bg-white/50 p-8 text-center">
        <p className="text-sm text-[#6b645a]">No {filter === 'lesson' ? 'lessons' : 'notes'} in this course yet.</p>
        <p className="text-xs text-[#9b9288] mt-1">Try another filter or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#e8f0fe] text-[#4a6a9b] border border-[#d4e2f7]">
          <BookOpen size={12} />
          {counts.lessons} {counts.lessons === 1 ? 'lesson' : 'lessons'}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#fef5e8] text-[#9a7530] border border-[#faeedc]">
          <FileText size={12} />
          {counts.notes} {counts.notes === 1 ? 'note' : 'notes'}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 text-[#6b645a] border border-[#e8e2d9]">
          <Layers size={12} />
          {grouped.length} {grouped.length === 1 ? 'unit' : 'units'}
        </span>
        {counts.files > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#eef5f0] text-[#4a7c5e] border border-[#ddebe2]">
            <Paperclip size={12} />
            {counts.files} {counts.files === 1 ? 'file' : 'files'}
          </span>
        )}
      </div>

      {grouped.map(({ unit, items }) => {
        const isOpen = !interactive || openUnits[unit];
        const sectionId = unitSectionId(unit);

        return (
          <section
            key={unit}
            id={sectionId}
            className="learn-unit-section rounded-2xl border border-[#e8e2d9]/80 bg-white/55 overflow-hidden scroll-mt-24"
          >
            {interactive ? (
              <button
                type="button"
                onClick={() => toggleUnit(unit)}
                className="learn-unit-section__head w-full px-5 py-3.5 border-b border-[#e8e2d9]/70 bg-[#faf8f5] flex items-center justify-between gap-3 text-left hover:bg-white/60 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Layers size={16} className="text-[#4a6a9b] shrink-0" />
                  <h3 className="font-semibold text-[#2c2824] text-sm truncate">{unit}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#9b9288] uppercase tracking-wider">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#9b9288] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
            ) : (
              <div className="px-5 py-3.5 border-b border-[#e8e2d9]/70 bg-[#faf8f5] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-[#4a6a9b]" />
                  <h3 className="font-semibold text-[#2c2824] text-sm">{unit}</h3>
                </div>
                <span className="text-[10px] text-[#9b9288] uppercase tracking-wider">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            )}

            <div
              className={`learn-unit-section__body divide-y divide-[#e8e2d9]/60 transition-all duration-300 ${
                isOpen ? 'opacity-100' : 'hidden'
              }`}
            >
              {items.map((resource) => {
                const meta = typeMeta[resource.type];
                const Icon = meta.icon;
                const isExpanded = interactive ? expandedId === resource.id : true;
                const hasBody = Boolean(resource.content.trim() || resource.file);

                return (
                  <article
                    key={resource.id}
                    className={`learn-material-card ${interactive && isExpanded ? 'learn-material-card--open' : ''}`}
                  >
                    {interactive && hasBody ? (
                      <button
                        type="button"
                        onClick={() => toggleResource(resource.id)}
                        className="learn-material-card__trigger w-full p-5 text-left hover:bg-white/40 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <MaterialCardHeader
                          resource={resource}
                          meta={meta}
                          Icon={Icon}
                          isExpanded={isExpanded}
                          showChevron
                        />
                      </button>
                    ) : (
                      <div className="p-5">
                        <MaterialCardHeader
                          resource={resource}
                          meta={meta}
                          Icon={Icon}
                          isExpanded={isExpanded}
                          adminActions={
                            mode === 'admin' && (onEdit || onDelete) ? (
                              <div className="flex gap-2 shrink-0">
                                {onEdit && (
                                  <button
                                    type="button"
                                    onClick={() => onEdit(resource)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e0d9d0] text-[#6b645a] hover:bg-[#faf8f5]"
                                  >
                                    Edit
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    type="button"
                                    onClick={() => onDelete(resource)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#f0d0d0] text-[#b70c0c] hover:bg-[#fef5f5]"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            ) : undefined
                          }
                        />
                      </div>
                    )}

                    {(!interactive || isExpanded) && hasBody && (
                      <div className="learn-material-card__body px-5 pb-5 -mt-1">
                        {resource.content.trim() ? (
                          <div className="rounded-xl border border-[#e8e2d9]/60 bg-[#faf8f5]/80 px-4 py-3.5">
                            <p className="text-sm text-[#555] leading-relaxed whitespace-pre-wrap">
                              {resource.content}
                            </p>
                          </div>
                        ) : null}
                        {resource.file && (
                          <div className={resource.content.trim() ? 'mt-3' : ''}>
                            <ResourceFileAttachment file={resource.file} />
                          </div>
                        )}
                      </div>
                    )}

                    {interactive && !hasBody && (
                      <div className="px-5 pb-5 pt-0">
                        <MaterialCardHeader resource={resource} meta={meta} Icon={Icon} isExpanded={false} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CourseLearningMaterials;
export { unitSectionId };
