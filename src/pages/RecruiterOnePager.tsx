import { useEffect } from "react";
import { Mail, Phone, Linkedin, Download, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

const RecruiterOnePager = () => {
  const location = useLocation();

  useEffect(() => {
    // Set page title for print
    document.title = "Mohamed Seliem - Recruiter One-Pager";
    
    // Auto-focus for printing
    window.addEventListener("afterprint", () => {
      window.history.back();
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* No-print nav bar */}
      <div className="no-print bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Download className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* One-Pager Content */}
      <div className="print:bg-white bg-white">
        <div className="max-w-4xl mx-auto px-8 py-12 print:py-16">
          {/* Header */}
          <div className="mb-12 border-b-4 border-blue-600 pb-8">
            <h1 className="text-5xl font-bold text-black mb-2">Mohamed Mahmoud Seliem</h1>
            <p className="text-2xl text-gray-700 font-semibold">Healthcare AI & Data Analytics</p>
            <p className="text-lg text-gray-600 mt-2">
              Licensed PT turned ML Engineer | Turning Clinical Chaos into Data-Driven Decisions
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-10 pb-8 border-b-2 border-gray-300 print:border-b-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Phone</p>
                  <p className="text-xl font-bold text-black">+20 100 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Email</p>
                  <p className="text-xl font-bold text-black">muhammadsleem03@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Numbers That Matter */}
          <div className="mb-12 pb-8 border-b-2 border-gray-300 print:border-b-2">
            <h2 className="text-2xl font-bold text-black mb-6">The 5 Numbers That Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  number: "300+",
                  label: "Patient Cases",
                  detail: "Managed annually",
                },
                {
                  number: "22%",
                  label: "Recovery Acceleration",
                  detail: "Using ML triage",
                },
                {
                  number: "18%",
                  label: "Misdiagnosis Reduction",
                  detail: "Through predictive models",
                },
                {
                  number: "20+ hrs",
                  label: "Weekly Time Saved",
                  detail: "Automated ETL pipelines",
                },
                {
                  number: "15%",
                  label: "Operational Efficiency",
                  detail: "From unified dashboards",
                },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50"
                >
                  <p className="text-3xl font-bold text-blue-600 mb-1">{metric.number}</p>
                  <p className="text-sm font-bold text-black mb-1">{metric.label}</p>
                  <p className="text-xs text-gray-700">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="mb-12 pb-8 border-b-2 border-gray-300 print:border-b-2">
            <h2 className="text-2xl font-bold text-black mb-6">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-bold text-black mb-3 text-lg">ML & Analytics</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Scikit-learn, TensorFlow</li>
                  <li>• Predictive modeling</li>
                  <li>• Feature engineering</li>
                  <li>• Fairness & bias audit</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-black mb-3 text-lg">Data Engineering</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Python, SQL, Pandas</li>
                  <li>• ETL automation</li>
                  <li>• Data pipeline design</li>
                  <li>• Healthcare data (HIPAA)</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-black mb-3 text-lg">Business Intelligence</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Power BI, Tableau</li>
                  <li>• Dashboard design</li>
                  <li>• KPI tracking</li>
                  <li>• Executive reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Hire */}
          <div className="mb-12 pb-8 border-b-2 border-gray-300 print:border-b-2">
            <h2 className="text-2xl font-bold text-black mb-6">Why I'm Different</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-black">Clinician + Engineer:</span> I've managed 300+ patient cases as a licensed PT. I understand the bottlenecks from the inside.
              </p>
              <p>
                <span className="font-bold text-black">End-to-End Builder:</span> From raw data to deployed model to clinician dashboard. I ship complete systems, not just notebooks.
              </p>
              <p>
                <span className="font-bold text-black">Measurable Impact:</span> Every project I touch has a number attached. 22% faster recovery ID. 18% fewer misdiagnoses. 20+ hrs saved weekly.
              </p>
              <p>
                <span className="font-bold text-black">Responsible AI:</span> My models undergo fairness audits (Aequitas), explainability checks (SHAP), and production monitoring (Evidently AI). Not a black box.
              </p>
            </div>
          </div>

          {/* Current Focus */}
          <div className="mb-12 pb-8 border-b-2 border-gray-300 print:border-b-2">
            <h2 className="text-2xl font-bold text-black mb-6">Currently Working On</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                <span className="font-bold text-black">🏥 Healthcare ML:</span> Predictive models for patient outcomes, resource allocation, and risk stratification
              </li>
              <li>
                <span className="font-bold text-black">📊 Data Automation:</span> ETL pipelines consolidating fragmented clinical data into unified dashboards
              </li>
              <li>
                <span className="font-bold text-black">🤖 Gen-AI Integration:</span> Enabling teams to build on top of LLMs and RAG systems safely
              </li>
              <li>
                <span className="font-bold text-black">📈 Training & Enablement:</span> Teaching non-technical teams to ask the right questions of their data
              </li>
            </ul>
          </div>

          {/* QR Code Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Connect</h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-bold text-black">LinkedIn:</span> linkedin.com/in/selimisme
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-black">GitHub:</span> github.com/Sleem13
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-black">Portfolio:</span> selimisme.dev
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-6 border-4 border-black bg-white rounded-lg">
                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md border-2 border-gray-400">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Simple QR code pattern placeholder */}
                    <rect fill="white" width="100" height="100"/>
                    
                    {/* Position markers */}
                    <rect fill="black" x="10" y="10" width="20" height="20"/>
                    <rect fill="white" x="12" y="12" width="16" height="16"/>
                    <rect fill="black" x="14" y="14" width="12" height="12"/>
                    
                    <rect fill="black" x="70" y="10" width="20" height="20"/>
                    <rect fill="white" x="72" y="12" width="16" height="16"/>
                    <rect fill="black" x="74" y="14" width="12" height="12"/>
                    
                    <rect fill="black" x="10" y="70" width="20" height="20"/>
                    <rect fill="white" x="12" y="72" width="16" height="16"/>
                    <rect fill="black" x="14" y="74" width="12" height="12"/>
                    
                    {/* Data pattern */}
                    {Array.from({ length: 7 }).map((_, i) =>
                      Array.from({ length: 7 }).map((_, j) => (
                        Math.random() > 0.5 && (
                          <rect 
                            key={`${i}-${j}`}
                            fill="black" 
                            x={35 + i * 8} 
                            y={35 + j * 8} 
                            width="6" 
                            height="6"
                          />
                        )
                      ))
                    )}
                  </svg>
                </div>
                <p className="text-center text-sm text-gray-600 mt-3 font-semibold">
                  Scan for LinkedIn Profile
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-300 text-center text-gray-700 text-sm">
            <p>Ready to build something that matters? Let's talk.</p>
            <p className="mt-2 font-semibold text-black">+20 100 123 4567 · muhammadsleem03@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none;
          }
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:py-16 {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          .print\\:border-b-2 {
            border-bottom: 2px solid #ccc !important;
          }
          page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RecruiterOnePager;
