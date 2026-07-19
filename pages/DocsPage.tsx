import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Search, Copy, Check, Terminal, Globe, Shield, Zap, 
  FileJson, Server, Code2, ChevronRight, ChevronDown, X, 
  ExternalLink, Menu, Loader2, AlertCircle, Quote, Info, 
  Key, Play, Settings, Layers, Eye, Code, Cpu
} from 'lucide-react';
import CTA from '../components/CTA';
import { useTheme } from '../lib/ThemeContext';
import openapiFallback from '../components/openapi-fallback.json';

// --- Interfaces & Types ---

interface OpenAPIObject {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{ url: string; description?: string }>;
  tags: Array<{ name: string; 'x-display-name'?: string; description?: string }>;
  paths: Record<string, any>;
  components?: {
    securitySchemes?: Record<string, any>;
    schemas?: Record<string, any>;
  };
}

interface APIOperation {
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: {
    required?: boolean;
    content?: Record<string, {
      schema: any;
    }>;
  };
  responses?: Record<string, {
    description?: string;
    content?: Record<string, {
      schema: any;
    }>;
  }>;
}

interface TaggedGroup {
  name: string;
  displayName: string;
  description: string;
  operations: APIOperation[];
}

interface PropertyDetail {
  name: string;
  type: string;
  required: boolean;
  description: string;
  enum?: any[];
  default?: any;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  const?: any;
}

// --- Helpers for Schema Parsing ---

const resolveSchema = (schema: any, components: any): any => {
  if (!schema) return null;
  if (schema.$ref) {
    const refPath = schema.$ref.split('/');
    const schemaName = refPath[refPath.length - 1];
    return components?.schemas?.[schemaName] || schema;
  }
  return schema;
};

const getPropertiesFromSchema = (schema: any, components?: any): Record<string, any> => {
  if (!schema) return {};
  const resolved = resolveSchema(schema, components);
  let props: Record<string, any> = {};
  
  if (resolved.properties) {
    props = { ...props, ...resolved.properties };
  }
  if (resolved.anyOf) {
    resolved.anyOf.forEach((sub: any) => {
      props = { ...props, ...getPropertiesFromSchema(sub, components) };
    });
  }
  if (resolved.oneOf) {
    resolved.oneOf.forEach((sub: any) => {
      props = { ...props, ...getPropertiesFromSchema(sub, components) };
    });
  }
  if (resolved.allOf) {
    resolved.allOf.forEach((sub: any) => {
      props = { ...props, ...getPropertiesFromSchema(sub, components) };
    });
  }
  return props;
};

const getPropertyDetails = (schema: any, components: any): PropertyDetail[] => {
  const resolved = resolveSchema(schema, components);
  if (!resolved) return [];
  
  const properties = getPropertiesFromSchema(resolved, components);
  const requiredList = resolved.required || [];
  
  return Object.entries(properties).map(([name, prop]: [string, any]) => {
    const resolvedProp = resolveSchema(prop, components);
    return {
      name,
      type: resolvedProp.type || 'any',
      required: requiredList.includes(name),
      description: resolvedProp.description || '',
      enum: resolvedProp.enum,
      default: resolvedProp.default,
      minLength: resolvedProp.minLength,
      maxLength: resolvedProp.maxLength,
      minimum: resolvedProp.minimum,
      maximum: resolvedProp.maximum,
      const: resolvedProp.const
    };
  });
};

const getMockJsonForSchema = (schema: any, components: any): string => {
  if (!schema) return '{}';
  const resolved = resolveSchema(schema, components);
  const props = getPropertiesFromSchema(resolved, components);
  const mockObj: Record<string, any> = {};
  
  Object.entries(props).forEach(([key, prop]: [string, any]) => {
    const resolvedProp = resolveSchema(prop, components);
    if (resolvedProp.default !== undefined) {
      mockObj[key] = resolvedProp.default;
    } else if (resolvedProp.enum && resolvedProp.enum.length > 0) {
      mockObj[key] = resolvedProp.enum[0];
    } else if (resolvedProp.const !== undefined) {
      mockObj[key] = resolvedProp.const;
    } else {
      switch (resolvedProp.type) {
        case 'string':
          if (key === 'prompt') {
            mockObj[key] = 'یک پرتره سینمایی با جزئیات بالا از یک یوزپلنگ ایرانی در مزارع سرسبز';
          } else if (key === 'aspectRatio' || key === 'aspect_ratio') {
            mockObj[key] = '16:9';
          } else if (key === 'duration') {
            mockObj[key] = '4';
          } else {
            mockObj[key] = 'string';
          }
          break;
        case 'number':
        case 'integer':
          mockObj[key] = 1;
          break;
        case 'boolean':
          mockObj[key] = false;
          break;
        case 'array':
          if (resolvedProp.items) {
            const resolvedItem = resolveSchema(resolvedProp.items, components);
            if (resolvedItem.type === 'object') {
              const subProps = getPropertiesFromSchema(resolvedItem, components);
              const subObj: Record<string, any> = {};
              Object.entries(subProps).forEach(([subK, subV]: [string, any]) => {
                const resSubV = resolveSchema(subV, components);
                subObj[subK] = resSubV.type === 'string' ? 'string' : 1;
              });
              mockObj[key] = [subObj];
            } else {
              mockObj[key] = ['string'];
            }
          } else {
            mockObj[key] = [];
          }
          break;
        case 'object':
          mockObj[key] = {};
          break;
        default:
          mockObj[key] = null;
      }
    }
  });
  return JSON.stringify(mockObj, null, 2);
};

// --- Sub-components for Styling ---

const CodeBlock = ({ code, language = 'bash', title }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/10 bg-[#0d0d0f] shadow-xl group relative dir-ltr text-left">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
           </div>
           {(title || language) && (
              <span className="text-[10px] font-mono text-gray-500 ml-2 uppercase tracking-wider">{title || language}</span>
           )}
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
          title="کپی در حافظه"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="relative max-h-[400px] overflow-y-auto">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '13px',
            lineHeight: '1.6',
            fontFamily: 'monospace'
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// --- Main DocsPage Component ---

const DocsPage: React.FC = () => {
  const { theme } = useTheme();
  
  // States
  const [openapi, setOpenapi] = useState<OpenAPIObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('intro'); // 'intro' or 'method:path'
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'node' | 'python' | 'go' | 'axios'>('curl');

  // Load OpenAPI Schema
  useEffect(() => {
    const fetchOpenAPI = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dash.lumai.ir/api/v1/openapi.json');
        if (!response.ok) {
          throw new Error('سیستم نتوانست اطلاعات مستندات را دریافت کند.');
        }
        const data = await response.json();
        setOpenapi(data);
        
        // Auto-expand tags by default
        const initialExpanded: Record<string, boolean> = {};
        if (data.tags) {
          data.tags.forEach((tag: any) => {
            initialExpanded[tag.name] = true;
          });
        }
        setExpandedTags(initialExpanded);
        setError(null);
      } catch (err: any) {
        console.warn('Failed to fetch remote openapi spec, using local fallback:', err);
        // Seamlessly use fallback spec so the page never errors
        const fallbackData = openapiFallback as any;
        setOpenapi(fallbackData);
        
        // Auto-expand tags for fallback
        const initialExpanded: Record<string, boolean> = {};
        if (fallbackData.tags) {
          fallbackData.tags.forEach((tag: any) => {
            initialExpanded[tag.name] = true;
          });
        }
        setExpandedTags(initialExpanded);
        setError(null); // Clear error because we successfully loaded fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpenAPI();
  }, []);

  // Parse paths and group them by tags
  const taggedGroups = useMemo<TaggedGroup[]>(() => {
    if (!openapi) return [];
    
    const groupsMap: Record<string, TaggedGroup> = {};
    
    // Initialize tags
    (openapi.tags || []).forEach(tag => {
      groupsMap[tag.name] = {
        name: tag.name,
        displayName: tag['x-display-name'] || tag.name,
        description: tag.description || '',
        operations: []
      };
    });
    
    // Process paths
    Object.entries(openapi.paths || {}).forEach(([path, pathItem]: [string, any]) => {
      Object.entries(pathItem).forEach(([method, operation]: [string, any]) => {
        if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
          return;
        }
        
        const op: APIOperation = {
          path,
          method: method.toLowerCase(),
          ...operation
        };
        
        const opTags = operation.tags || [];
        if (opTags.length > 0) {
          opTags.forEach((tagName: string) => {
            if (!groupsMap[tagName]) {
              groupsMap[tagName] = {
                name: tagName,
                displayName: tagName,
                description: '',
                operations: []
              };
            }
            groupsMap[tagName].operations.push(op);
          });
        } else {
          const fallbackTag = 'general';
          if (!groupsMap[fallbackTag]) {
            groupsMap[fallbackTag] = {
              name: fallbackTag,
              displayName: 'عمومی',
              description: 'مسیرهای عمومی وب‌سرویس',
              operations: []
            };
          }
          groupsMap[fallbackTag].operations.push(op);
        }
      });
    });
    
    return Object.values(groupsMap).filter(g => g.operations.length > 0);
  }, [openapi]);

  // Expand tag on search match
  useEffect(() => {
    if (searchQuery) {
      const updatedExpanded: Record<string, boolean> = {};
      taggedGroups.forEach(group => {
        const matches = group.operations.some(op => 
          (op.summary && op.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
          op.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (op.description && op.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (matches) {
          updatedExpanded[group.name] = true;
        }
      });
      setExpandedTags(prev => ({ ...prev, ...updatedExpanded }));
    }
  }, [searchQuery, taggedGroups]);

  // Toggle Tag Collapse
  const toggleTag = (tagName: string) => {
    setExpandedTags(prev => ({ ...prev, [tagName]: !prev[tagName] }));
  };

  // Filter operations for active rendering
  const activeOperation = useMemo<APIOperation | null>(() => {
    if (!openapi || activeId === 'intro') return null;
    const [method, path] = activeId.split(':');
    const pathItem = openapi.paths[path];
    if (!pathItem) return null;
    const operation = pathItem[method];
    if (!operation) return null;
    return {
      path,
      method,
      ...operation
    };
  }, [openapi, activeId]);

  // Code snippets generator
  const generatedCode = useMemo(() => {
    if (!activeOperation) return '';
    const serverUrl = openapi?.servers?.[0]?.url || 'https://dash.lumai.ir/api/v1';
    const fullUrl = `${serverUrl}${activeOperation.path}`;
    
    // Construct placeholder data
    const requestSchema = activeOperation.requestBody?.content?.['application/json']?.schema;
    const hasBody = !!requestSchema;
    const mockJson = hasBody ? getMockJsonForSchema(requestSchema, openapi?.components) : '{}';
    
    switch (selectedLanguage) {
      case 'curl':
        return `curl -X ${activeOperation.method.toUpperCase()} "${fullUrl}" \\
  -H "Authorization: Bearer <your_api_key>" \\
  -H "Content-Type: application/json"${hasBody ? ` \\\n  -d '${mockJson.replace(/'/g, "'\\''")}'` : ''}`;
      
      case 'node':
        return `const apiKey = 'YOUR_API_KEY';
const url = '${fullUrl}';

const options = {
  method: '${activeOperation.method.toUpperCase()}',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }${hasBody ? `,\n  body: JSON.stringify(${mockJson.split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n')})` : ''}
};

fetch(url, options)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));`;

      case 'python':
        return `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
${hasBody ? `payload = ${mockJson.replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None')}

response = requests.${activeOperation.method}(url, json=payload, headers=headers)` : `response = requests.${activeOperation.method}(url, headers=headers)`}

print(response.json())`;

      case 'axios':
        return `import axios from 'axios';

const url = '${fullUrl}';
const apiKey = 'YOUR_API_KEY';

axios({
  method: '${activeOperation.method}',
  url: url,
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }${hasBody ? `,\n  data: ${mockJson.split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n')}` : ''}
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});`;

      case 'go':
        return `package main

import (
\t"bytes"
\t"encoding/json"
\t"fmt"
\t"net/http"
)

func main() {
\turl := "${fullUrl}"
\t
\t${hasBody ? `// Payload definition
\tpayload := map[string]interface{}{
${JSON.parse(mockJson) ? Object.entries(JSON.parse(mockJson)).map(([k, v]) => `\t\t"${k}": ${typeof v === 'string' ? `"${v}"` : v},`).join('\n') : ''}
\t}
\tjsonValue, _ := json.Marshal(payload)
\treq, _ := http.NewRequest("${activeOperation.method.toUpperCase()}", url, bytes.NewBuffer(jsonValue))` : `req, _ := http.NewRequest("${activeOperation.method.toUpperCase()}", url, nil)`}
\t
\treq.Header.Add("Authorization", "Bearer YOUR_API_KEY")
\treq.Header.Add("Content-Type", "application/json")
\t
\tclient := &http.Client{}
\tresp, err := client.Do(req)
\tif err != nil {
\t\tfmt.Println("Error:", err)
\t\treturn
\t}
\tdefer resp.Body.Close()
\t
\tvar result map[string]interface{}
\tjson.NewDecoder(resp.Body).Decode(&result)
\tfmt.Printf("%+v\\n", result)
}`;

      default:
        return '';
    }
  }, [activeOperation, openapi, selectedLanguage]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white pt-20 font-sans transition-colors duration-300">
      
      {/* --- Premium Smooth Mask Fade Backgrounds --- */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />
         
         <motion.div 
            animate={{ 
               x: [0, 80, -40, 0],
               y: [0, -40, 40, 0],
               scale: [1, 1.15, 0.95, 1],
               opacity: [0.1, 0.18, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-luma-purple/15 dark:bg-luma-purple/20 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen"
         />
         <motion.div 
            animate={{ 
               x: [0, -40, 40, 0],
               y: [0, 40, -40, 0],
               scale: [1, 1.1, 0.9, 1],
               opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luma-pink/15 dark:bg-luma-pink/20 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen"
         />

         <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
               
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 backdrop-blur-md shadow-md dark:shadow-lg transition-colors duration-300"
               >
                  <Terminal size={12} className="text-luma-purple" />
                  <span className="text-[10px] font-bold text-zinc-650 dark:text-gray-350 tracking-wider uppercase">Luma Developers Center</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-white/20 mx-1" />
                  <span className="text-[10px] text-luma-purple font-mono">OpenAPI V3</span>
               </motion.div>

               <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
               >
                  <span className="text-gradient-animated">مستندات فنی API</span>
               </motion.h1>

               <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-zinc-600 dark:text-gray-400 mb-10 leading-relaxed font-light max-w-2xl"
               >
                  مرجع رسمی و مشخصات وب‌سرویس لوما برای تولید تصویر، ویرایش رسانه‌ها، تولید ویدیو و فرآیندهای ابری.
               </motion.p>

               {/* Advanced Search Bar */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-2xl relative group z-20"
               >
                  <div className={`
                     absolute -inset-0.5 bg-gradient-to-r from-luma-purple/40 to-luma-pink/40 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500
                     ${searchQuery ? 'opacity-40' : ''}
                  `} />
                  <div className="relative bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl flex items-center h-14 px-4 shadow-xl dark:shadow-2xl transition-all group-focus-within:border-zinc-400 dark:group-focus-within:border-white/30">
                     <Search size={20} className={`ml-3 transition-colors ${searchQuery ? 'text-luma-purple' : 'text-zinc-400 dark:text-gray-500'}`} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو در مسیرها و متدهای فنی (مثلا: generate، ویدیو، assets)..." 
                        className="bg-transparent border-none outline-none text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 w-full h-full font-light"
                     />
                     {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white">
                           <X size={16} />
                        </button>
                     )}
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* --- Main Section --- */}
      <div className="max-w-screen-2xl mx-auto px-6 py-12 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- Sidebar (Sticky Navigation) --- */}
            <aside className="lg:col-span-3 hidden lg:block">
               <div className="sticky top-32 space-y-6 pr-2 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
                  
                  {isLoading ? (
                     <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                           <div key={i} className="h-8 bg-zinc-200 dark:bg-white/5 rounded-lg animate-pulse" />
                        ))}
                     </div>
                  ) : error ? (
                     <div className="text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                     </div>
                  ) : (
                     <div className="space-y-4">
                        
                        {/* Intro Option */}
                        <button
                          onClick={() => {
                            setActiveId('intro');
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-all ${
                            activeId === 'intro' 
                              ? 'bg-luma-purple/10 text-luma-purple font-medium border-r-2 border-luma-purple'
                              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-gray-200 hover:bg-zinc-200/40 dark:hover:bg-white/5'
                          }`}
                        >
                          <Info size={16} />
                          <span>معرفی عمومی API</span>
                        </button>

                        <div className="h-px bg-zinc-200 dark:bg-white/5 my-2" />

                        {/* Tagged Groups Accordions */}
                        {taggedGroups.map((group) => {
                          const isExpanded = expandedTags[group.name];
                          
                          // Filter operations inside tag
                          const filteredOps = group.operations.filter(op => {
                            if (!searchQuery) return true;
                            return (op.summary && op.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
                              op.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (op.description && op.description.toLowerCase().includes(searchQuery.toLowerCase()));
                          });

                          if (filteredOps.length === 0) return null;

                          return (
                            <div key={group.name} className="space-y-1">
                              <button
                                onClick={() => toggleTag(group.name)}
                                className="w-full flex items-center justify-between text-xs font-bold text-zinc-400 dark:text-gray-400 uppercase tracking-wider px-3 py-1.5 hover:text-zinc-700 dark:hover:text-white transition-colors"
                              >
                                <span className="flex items-center gap-2">
                                  <Layers size={12} className="text-luma-pink" />
                                  {group.displayName}
                                </span>
                                <ChevronDown size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              {isExpanded && (
                                <ul className="mr-3 border-r border-zinc-200 dark:border-white/5 space-y-0.5">
                                  {filteredOps.map((op) => {
                                    const opId = `${op.method}:${op.path}`;
                                    const isSelected = activeId === opId;
                                    
                                    // Method colors
                                    const methodColors: Record<string, string> = {
                                      get: 'text-blue-500',
                                      post: 'text-emerald-500',
                                      put: 'text-amber-500',
                                      delete: 'text-rose-500'
                                    };

                                    return (
                                      <li key={opId}>
                                        <button
                                          onClick={() => {
                                            setActiveId(opId);
                                            window.scrollTo({ top: 400, behavior: 'smooth' });
                                          }}
                                          className={`w-full flex items-center justify-between text-right px-4 py-2 text-[13px] transition-all rounded-l-lg border-r-2 -mr-[1px] ${
                                            isSelected
                                              ? 'border-luma-purple text-zinc-900 dark:text-white bg-luma-purple/10 dark:bg-luma-purple/5 font-medium'
                                              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-gray-300 hover:bg-zinc-200/50 dark:hover:bg-white/[0.02]'
                                          }`}
                                        >
                                          <span className="truncate max-w-[170px]">{op.summary || op.path}</span>
                                          <span className={`text-[10px] font-mono font-bold uppercase ${methodColors[op.method] || 'text-zinc-400'}`}>
                                            {op.method}
                                          </span>
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          );
                        })}

                      </div>
                  )}

               </div>
            </aside>

            {/* --- Main Document Window / Playground --- */}
            <main className="lg:col-span-9 min-h-[500px]">
              
              {/* Mobile Navigation Dropdown */}
              <div className="lg:hidden mb-6">
                <button 
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-2xl text-zinc-850 dark:text-gray-300 font-bold shadow-md dark:shadow-lg transition-all active:scale-[0.99]"
                >
                  <span className="flex items-center gap-2">
                    <Menu size={18} className="text-luma-purple" />
                    فهرست و منوی مسیرها
                  </span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileNavOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-white/5 rounded-2xl mt-2 p-3 shadow-xl max-h-[60vh] overflow-y-auto custom-scrollbar space-y-4">
                        
                        <button
                          onClick={() => {
                            setActiveId('intro');
                            setIsMobileNavOpen(false);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                            activeId === 'intro' ? 'bg-luma-purple/10 text-luma-purple' : 'text-zinc-500 hover:bg-zinc-100'
                          }`}
                        >
                          <Info size={16} />
                          <span>معرفی عمومی API</span>
                        </button>

                        <div className="h-px bg-zinc-200 dark:bg-white/5" />

                        {taggedGroups.map(group => (
                          <div key={group.name} className="space-y-1">
                            <div className="px-4 py-1 text-xs font-bold text-luma-pink uppercase">{group.displayName}</div>
                            {group.operations.map(op => {
                              const opId = `${op.method}:${op.path}`;
                              const isSel = activeId === opId;
                              return (
                                <button
                                  key={opId}
                                  onClick={() => {
                                    setActiveId(opId);
                                    setIsMobileNavOpen(false);
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                  }}
                                  className={`w-full text-right px-6 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between ${
                                    isSel ? 'bg-luma-purple/10 text-luma-purple' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'
                                  }`}
                                >
                                  <span>{op.summary || op.path}</span>
                                  <span className="text-[10px] font-mono uppercase font-bold text-gray-400">{op.method}</span>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Loader */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#0f0f0f] rounded-[32px] border border-zinc-200 dark:border-white/5 min-h-[600px]">
                   <div className="relative">
                      <div className="absolute inset-0 bg-luma-purple blur-xl opacity-20 rounded-full animate-pulse" />
                      <Loader2 size={40} className="text-luma-purple animate-spin relative z-10" />
                   </div>
                   <p className="text-xs text-gray-500 font-medium mt-4 tracking-widest uppercase">در حال بارگذاری کلیدها و مشخصات فنی...</p>
                </div>
              ) : activeId === 'intro' && openapi ? (
                // --- INTRODUCTION VIEW ---
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-[#0c0c0e] rounded-[32px] p-8 md:p-12 border border-zinc-200/50 dark:border-white/5 shadow-sm space-y-10 text-right"
                >
                  <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-white/5 pb-6">
                    <div className="w-12 h-12 rounded-2xl bg-luma-purple/10 flex items-center justify-center text-luma-purple">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">{openapi.info.title}</h2>
                      <p className="text-xs text-zinc-400 dark:text-gray-500 mt-1 font-mono">مشخصات نسخه: {openapi.info.version}</p>
                    </div>
                  </div>

                  {/* Render description as markdown */}
                  <div className="markdown-body text-zinc-700 dark:text-gray-300 leading-8 text-[16px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {openapi.info.description}
                    </ReactMarkdown>
                  </div>

                  {/* Servers List */}
                  {openapi.servers && openapi.servers.length > 0 && (
                    <div className="p-6 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                        <Server size={16} className="text-luma-pink" />
                        <span>سرور اصلی وب‌سرویس (Base URL)</span>
                      </div>
                      <div className="flex items-center justify-between bg-zinc-100 dark:bg-black/40 border border-zinc-200/40 dark:border-white/5 p-3 rounded-xl dir-ltr text-left">
                        <span className="font-mono text-xs text-luma-pink select-all">{openapi.servers[0].url}</span>
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 uppercase tracking-widest font-bold">Production</span>
                      </div>
                    </div>
                  )}

                  {/* Security Specs */}
                  <div className="p-6 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                      <Shield size={16} className="text-luma-purple" />
                      <span>امنیت و کلیدهای احراز هویت</span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-gray-400 leading-7">
                      همهٔ درخواست‌ها باید شامل هدر احراز هویت با ساختار توکن Bearer باشند. شما می‌توانید کلیدهای خود را از پنل کاربری بخش توسعه‌دهندگان مدیریت کنید.
                    </p>
                    <CodeBlock 
                      language="bash"
                      code="Authorization: Bearer <YOUR_API_KEY>"
                      title="HTTP Header"
                    />
                  </div>
                </motion.div>
              ) : activeOperation && openapi ? (
                // --- ENDPOINT DETAILS VIEW ---
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column - Specifications (7/12) */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0e] rounded-[32px] p-8 border border-zinc-200/50 dark:border-white/5 shadow-sm space-y-10 text-right">
                    
                    {/* Header */}
                    <div className="space-y-4 border-b border-zinc-200 dark:border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        {/* Method badge */}
                        <span className={`text-xs font-mono uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${
                          activeOperation.method === 'get' ? 'bg-blue-500/10 text-blue-500' :
                          activeOperation.method === 'post' ? 'bg-emerald-500/10 text-emerald-500' :
                          activeOperation.method === 'put' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-rose-500/10 text-rose-500'
                        }`}>
                          {activeOperation.method}
                        </span>
                        
                        <span className="text-xs font-mono text-zinc-400 dark:text-gray-500 truncate">{activeOperation.path}</span>
                      </div>

                      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">{activeOperation.summary}</h2>
                      {activeOperation.description && (
                        <p className="text-[15px] text-zinc-650 dark:text-gray-400 leading-relaxed font-light">
                          {activeOperation.description}
                        </p>
                      )}
                    </div>

                    {/* Path Copy Block */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 dark:text-gray-500">مسیر فراخوانی (Endpoint URL)</label>
                      <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-black/30 border border-zinc-200/40 dark:border-white/5 rounded-xl dir-ltr text-left">
                        <span className="font-mono text-xs text-zinc-700 dark:text-gray-300 truncate mr-4">
                          {`${openapi.servers?.[0]?.url || 'https://dash.lumai.ir/api/v1'}${activeOperation.path}`}
                        </span>
                        <button
                          onClick={() => {
                            const full = `${openapi.servers?.[0]?.url || 'https://dash.lumai.ir/api/v1'}${activeOperation.path}`;
                            navigator.clipboard.writeText(full);
                          }}
                          className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
                          title="کپی لینک کامل"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-white/[0.01] border border-zinc-200/40 dark:border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2.5">
                        <Key size={16} className="text-luma-purple" />
                        <span className="text-xs font-bold text-zinc-600 dark:text-gray-300">نیاز به احراز هویت (Bearer Token)</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Path / Query Parameters */}
                    {activeOperation.parameters && activeOperation.parameters.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-800 dark:text-white border-r-2 border-luma-pink pr-2">پارامترهای آدرس (Query & Path Parameters)</h3>
                        <div className="divide-y divide-zinc-100 dark:divide-white/5 border border-zinc-200/40 dark:border-white/5 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-transparent">
                          {activeOperation.parameters.map((param: any, idx: number) => (
                            <div key={idx} className="p-4 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-luma-purple">{param.name}</span>
                                  <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-mono">({param.in})</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono text-zinc-400 dark:text-gray-500 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                    {param.schema?.type || 'string'}
                                  </span>
                                  {param.required && (
                                    <span className="text-[9px] font-bold text-rose-500 bg-rose-500/10 px-1 rounded">ضروری</span>
                                  )}
                                </div>
                              </div>
                              {param.description && (
                                <p className="text-xs text-zinc-500 dark:text-gray-400 leading-relaxed font-light">{param.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Request Body Properties */}
                    {activeOperation.requestBody?.content?.['application/json']?.schema && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-800 dark:text-white border-r-2 border-luma-purple pr-2">پارامترهای بدنه درخواست (JSON Request Body)</h3>
                        <div className="divide-y divide-zinc-100 dark:divide-white/5 border border-zinc-200/40 dark:border-white/5 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-transparent">
                          {getPropertyDetails(activeOperation.requestBody.content['application/json'].schema, openapi.components).map((prop, idx) => (
                            <div key={idx} className="p-4 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-zinc-800 dark:text-gray-200">{prop.name}</span>
                                  <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-mono">({prop.type})</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {prop.required && (
                                    <span className="text-[9px] font-bold text-rose-500 bg-rose-500/10 px-1 rounded">ضروری</span>
                                  )}
                                  {prop.default !== undefined && (
                                    <span className="text-[10px] font-mono text-zinc-400 dark:text-gray-500">پیش‌فرض: {String(prop.default)}</span>
                                  )}
                                </div>
                              </div>
                              
                              {prop.description && (
                                <p className="text-xs text-zinc-500 dark:text-gray-400 leading-relaxed font-light">{prop.description}</p>
                              )}

                              {/* Enum or constraints list */}
                              {(prop.enum || prop.const !== undefined) && (
                                <div className="flex flex-wrap gap-1.5 mt-2 pt-1 dir-ltr text-left">
                                  {prop.const !== undefined ? (
                                    <span className="text-[10px] font-mono bg-zinc-100 dark:bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200/40 dark:border-white/5">
                                      const: {prop.const}
                                    </span>
                                  ) : (
                                    prop.enum?.map((val, eIdx) => (
                                      <span key={eIdx} className="text-[10px] font-mono bg-zinc-100 dark:bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200/40 dark:border-white/5">
                                        {val}
                                      </span>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Responses List */}
                    {activeOperation.responses && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-800 dark:text-white border-r-2 border-emerald-500 pr-2">کدهای پاسخ احتمالی (HTTP Responses)</h3>
                        <div className="space-y-2">
                          {Object.entries(activeOperation.responses).map(([code, response]: [string, any]) => {
                            const isSuccess = code.startsWith('2');
                            return (
                              <div key={code} className="p-4 border border-zinc-200/40 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.01] rounded-2xl flex items-start gap-3">
                                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                  isSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                }`}>
                                  {code}
                                </span>
                                <div className="space-y-1">
                                  <div className="text-xs font-bold text-zinc-700 dark:text-gray-200">{response.description}</div>
                                  {response.content?.['application/json']?.schema && (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 dark:text-gray-500 font-mono mt-1">
                                      <FileJson size={10} />
                                      application/json response schema
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right Column - Snippets & Playground (5/12) */}
                  <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
                    
                    {/* Code Playground / Snippet Box */}
                    <div className="bg-[#0c0c0e] rounded-[32px] border border-white/5 shadow-2xl p-6 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Code size={16} className="text-luma-purple" />
                          <span className="text-xs font-bold text-gray-300">نمونه کد فراخوانی API</span>
                        </div>
                        
                        {/* Selector Tabs */}
                        <div className="flex items-center gap-1 bg-white/[0.02] p-1 rounded-lg border border-white/5 dir-ltr">
                          {(['curl', 'node', 'python', 'go', 'axios'] as const).map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setSelectedLanguage(lang)}
                              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                                selectedLanguage === lang 
                                  ? 'bg-luma-purple text-white font-bold' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {lang === 'node' ? 'fetch' : lang}
                            </button>
                          ))}
                        </div>
                      </div>

                      <CodeBlock 
                        language={selectedLanguage === 'node' || selectedLanguage === 'axios' ? 'javascript' : selectedLanguage}
                        code={generatedCode}
                      />
                    </div>

                    {/* Mock Output / Response Preview */}
                    {activeOperation.responses && (
                      <div className="bg-[#0c0c0e] rounded-[32px] border border-white/5 shadow-2xl p-6 overflow-hidden space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                          <Eye size={16} className="text-emerald-500" />
                          <span className="text-xs font-bold text-gray-300">پاسخ نمونه وب‌سرویس</span>
                        </div>

                        {/* Extract first success or default response schema for preview */}
                        {(() => {
                          const successCode = Object.keys(activeOperation.responses).find(c => c.startsWith('2')) || 'default';
                          const responseObj = activeOperation.responses[successCode];
                          const schema = responseObj?.content?.['application/json']?.schema;
                          
                          if (schema) {
                            return (
                              <CodeBlock 
                                language="json"
                                code={getMockJsonForSchema(schema, openapi.components)}
                                title={`HTTP ${successCode} Response JSON`}
                              />
                            );
                          } else {
                            return (
                              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-center text-xs text-gray-500">
                                پاسخی با قالب JSON برای نمایش وجود ندارد.
                              </div>
                            );
                          }
                        })()}
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl bg-zinc-50 dark:bg-white/[0.01]">
                   <FileJson size={48} className="text-zinc-400 dark:text-gray-600 mb-4 opacity-50" />
                   <h3 className="text-xl font-bold text-zinc-800 dark:text-gray-300 mb-2">مسیری پیدا نشد</h3>
                   <p className="text-zinc-500 dark:text-gray-500 text-sm">لطفاً برای اطلاعات بیشتر یکی از متدها را از منوی سمت راست انتخاب کنید.</p>
                </div>
              )}

            </main>
         </div>
      </div>

      <CTA />
    </div>
  );
};

export default DocsPage;
