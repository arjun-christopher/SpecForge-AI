import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileCode, Database, ListChecks, Layers, Copy, Check } from 'lucide-react';

/**
 * ResultsDisplay Component
 * Displays the structured analysis results with expandable sections.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.results - Analysis results from the API
 */
export default function ResultsDisplay({ results }) {
  const [expandedSections, setExpandedSections] = useState({
    requirements: true,
    api: true,
    database: true,
    tasks: true,
  });

  const [copiedSection, setCopiedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'badge-warning';
      case 'medium':
        return 'badge-primary';
      case 'low':
        return 'badge-success';
      default:
        return 'badge';
    }
  };

  const getMethodColor = (method) => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'text-green-400';
      case 'POST':
        return 'text-blue-400';
      case 'PUT':
      case 'PATCH':
        return 'text-yellow-400';
      case 'DELETE':
        return 'text-red-400';
      default:
        return 'text-dark-300';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-slide-up">
      {/* Requirements Section */}
      <section className="card">
        <button
          onClick={() => toggleSection('requirements')}
          className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-600/20">
              <ListChecks className="w-6 h-6 text-primary-400" />
            </div>
            <h2 className="subsection-title">Requirements Breakdown</h2>
            <span className="badge-primary">{results.requirements?.length || 0}</span>
          </div>
          {expandedSections.requirements ? (
            <ChevronUp className="w-5 h-5 text-dark-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-400" />
          )}
        </button>

        {expandedSections.requirements && (
          <div className="space-y-3">
            {results.requirements?.map((req, index) => (
              <div key={index} className="glass-hover p-4 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-primary-400">{req.id}</span>
                    <span className={`badge ${getPriorityColor(req.priority)}`}>
                      {req.priority}
                    </span>
                    <span className="badge-accent">{req.category}</span>
                  </div>
                </div>
                <p className="text-dark-200">{req.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* API Design Section */}
      <section className="card">
        <button
          onClick={() => toggleSection('api')}
          className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-600/20">
              <Layers className="w-6 h-6 text-accent-400" />
            </div>
            <h2 className="subsection-title">API Design</h2>
            <span className="badge-accent">{results.api_design?.length || 0} endpoints</span>
          </div>
          {expandedSections.api ? (
            <ChevronUp className="w-5 h-5 text-dark-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-400" />
          )}
        </button>

        {expandedSections.api && (
          <div className="space-y-4">
            {results.api_design?.map((endpoint, index) => (
              <div key={index} className="glass-hover p-4 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`font-mono font-bold text-sm ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <code className="text-sm text-primary-300">{endpoint.path}</code>
                    {endpoint.authentication && (
                      <span className="badge-warning text-xs">🔒 Auth Required</span>
                    )}
                  </div>
                </div>
                <p className="text-dark-200 mb-3">{endpoint.description}</p>
                
                {endpoint.request_body && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-dark-400 mb-1">Request Body:</p>
                    <pre className="code-block text-xs">
                      {JSON.stringify(endpoint.request_body, null, 2)}
                    </pre>
                  </div>
                )}
                
                {endpoint.response && (
                  <div>
                    <p className="text-xs font-semibold text-dark-400 mb-1">Response:</p>
                    <pre className="code-block text-xs">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Database Schema Section */}
      <section className="card">
        <button
          onClick={() => toggleSection('database')}
          className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-600/20">
              <Database className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="subsection-title">Database Schema</h2>
            <span className="badge-success">{results.database_schema?.length || 0} tables</span>
          </div>
          {expandedSections.database ? (
            <ChevronUp className="w-5 h-5 text-dark-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-400" />
          )}
        </button>

        {expandedSections.database && (
          <div className="space-y-4">
            {/* Table Definitions */}
            {results.database_schema?.map((table, index) => (
              <div key={index} className="glass-hover p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-green-300 mb-3">{table.table_name}</h3>
                
                <div className="space-y-2 mb-3">
                  {table.columns?.map((col, colIndex) => (
                    <div key={colIndex} className="flex items-center space-x-3 text-sm">
                      <span className="font-mono text-primary-300">{col.name}</span>
                      <span className="text-dark-400">{col.type}</span>
                      {col.constraints && (
                        <span className="badge-primary text-xs">{col.constraints}</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {table.indexes && table.indexes.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-dark-400 mb-1">Indexes:</p>
                    <div className="flex flex-wrap gap-2">
                      {table.indexes.map((idx, idxIndex) => (
                        <span key={idxIndex} className="badge-accent text-xs">{idx}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {table.relationships && table.relationships.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-dark-400 mb-1">Relationships:</p>
                    <div className="space-y-1">
                      {table.relationships.map((rel, relIndex) => (
                        <p key={relIndex} className="text-xs text-dark-300">{rel}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* SQL Schema */}
            {results.database_schema_sql && (
              <div className="glass-hover p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-green-300">SQL Schema</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(results.database_schema_sql, 'sql')}
                    className="btn-secondary py-2 px-4 text-sm flex items-center space-x-2"
                  >
                    {copiedSection === 'sql' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="code-block custom-scrollbar max-h-96">
                  {results.database_schema_sql}
                </pre>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sprint Tasks Section */}
      <section className="card">
        <button
          onClick={() => toggleSection('tasks')}
          className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-yellow-600/20">
              <ListChecks className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="subsection-title">Sprint Tasks</h2>
            <span className="badge-warning">{results.sprint_tasks?.length || 0} tasks</span>
          </div>
          {expandedSections.tasks ? (
            <ChevronUp className="w-5 h-5 text-dark-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-400" />
          )}
        </button>

        {expandedSections.tasks && (
          <div className="space-y-3">
            {/* Group tasks by sprint */}
            {Object.entries(
              results.sprint_tasks?.reduce((acc, task) => {
                const sprint = task.sprint || 1;
                if (!acc[sprint]) acc[sprint] = [];
                acc[sprint].push(task);
                return acc;
              }, {}) || {}
            ).map(([sprint, tasks]) => (
              <div key={sprint} className="space-y-3">
                <h3 className="text-sm font-semibold text-primary-300 flex items-center space-x-2">
                  <span>Sprint {sprint}</span>
                  <span className="badge-primary text-xs">{tasks.length} tasks</span>
                </h3>
                {tasks.map((task, index) => (
                  <div key={index} className="glass-hover p-4 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-accent-400">{task.task_id}</span>
                        <span className="badge-accent text-xs">{task.story_points} pts</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-dark-100 mb-2">{task.title}</h4>
                    <p className="text-sm text-dark-300 mb-2">{task.description}</p>
                    
                    {task.dependencies && task.dependencies.length > 0 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-dark-400">Dependencies:</span>
                        {task.dependencies.map((dep, depIndex) => (
                          <span key={depIndex} className="badge text-xs">{dep}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
