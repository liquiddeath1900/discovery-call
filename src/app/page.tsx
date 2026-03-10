'use client';

import { useState, useRef } from 'react';

// Form data type
interface FormData {
  // Step 1: Basic Info
  date: string;
  dispensaryName: string;
  contactName: string;
  contactTitle: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  yearsInBusiness: string;
  employeeCount: string;
  operatingHours: string;
  discoverySource: string;
  hasGBP: string;

  // Step 2: Time Drains
  dailyBottlenecks: string;
  repetitiveTasks: string;
  menuUpdateProcess: string;
  metrcFrustrations: string;
  budtenderTrainingTime: string;

  // Step 3: Money Leaks
  customerAcquisition: string;
  peakSlowPeriods: string;
  stockOutIncidents: string;
  afterHoursMissedLeads: string;
  conversionRate: string;

  // Step 4: Stress Points
  primaryConcerns: string[];
  metrcCloseCallsOrFines: string;
  regulatoryKnowledge: string;
  keyPersonDependencies: string;

  // Step 5: Competition
  nearbyDispensaries: string;
  googleSearchRanking: string;
  competitorStrategies: string;

  // Step 6: Demo Notes
  demoNotes: string;

  // Step 7: Pain Summary
  painPoint1: string;
  painPoint2: string;
  painPoint3: string;

  // Step 8: Money Math
  monthlyHoursWasted: string;
  lostRevenueFromMissedLeads: string;
  rankingImpact: string;

  // Step 9: Next Steps
  followUpEmail: boolean;
  sendProposal: boolean;
  addToCRM: boolean;
  followUpDate: string;
  leadTemperature: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  date: new Date().toISOString().split('T')[0],
  dispensaryName: '',
  contactName: '',
  contactTitle: '',
  phone: '',
  email: '',
  location: '',
  website: '',
  yearsInBusiness: '',
  employeeCount: '',
  operatingHours: '',
  discoverySource: '',
  hasGBP: '',
  dailyBottlenecks: '',
  repetitiveTasks: '',
  menuUpdateProcess: '',
  metrcFrustrations: '',
  budtenderTrainingTime: '',
  customerAcquisition: '',
  peakSlowPeriods: '',
  stockOutIncidents: '',
  afterHoursMissedLeads: '',
  conversionRate: '',
  primaryConcerns: [],
  metrcCloseCallsOrFines: '',
  regulatoryKnowledge: '',
  keyPersonDependencies: '',
  nearbyDispensaries: '',
  googleSearchRanking: '',
  competitorStrategies: '',
  demoNotes: '',
  painPoint1: '',
  painPoint2: '',
  painPoint3: '',
  monthlyHoursWasted: '',
  lostRevenueFromMissedLeads: '',
  rankingImpact: '',
  followUpEmail: false,
  sendProposal: false,
  addToCRM: false,
  followUpDate: '',
  leadTemperature: '',
  additionalNotes: '',
};

const steps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Time Drains' },
  { id: 3, label: 'Money Leaks' },
  { id: 4, label: 'Stress Points' },
  { id: 5, label: 'Competition' },
  { id: 6, label: 'Demo Notes' },
  { id: 7, label: 'Pain Summary' },
  { id: 8, label: 'Money Math' },
  { id: 9, label: 'Next Steps' },
];

export default function DiscoveryCall() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const concerns = formData.primaryConcerns.length > 0
      ? formData.primaryConcerns.join(', ')
      : 'None selected';

    const hoursVal = parseFloat(formData.monthlyHoursWasted) || 0;
    const missedVal = parseFloat(formData.lostRevenueFromMissedLeads) || 0;
    const totalLoss = (hoursVal * 25) + missedVal;

    printWindow.document.write(`<!DOCTYPE html><html><head><title>${formData.dispensaryName || 'Discovery Call'} - SeamlessFlow</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1a1a2e; padding: 40px; }
  @page { size: letter; margin: 0.75in; }
  .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a1a2e; padding-bottom: 20px; }
  .header img { width: 180px; margin-bottom: 10px; }
  .header h1 { font-size: 20pt; color: #1a1a2e; margin-bottom: 4px; }
  .header p { font-size: 10pt; color: #666; }
  .section { margin-bottom: 20px; page-break-inside: avoid; }
  .section h2 { font-size: 13pt; color: #1a1a2e; border-bottom: 2px solid #eee; padding-bottom: 6px; margin-bottom: 10px; }
  .section h3 { font-size: 11pt; color: #444; margin: 8px 0 4px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
  .field { margin-bottom: 6px; }
  .field .label { font-size: 9pt; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
  .field .value { font-size: 11pt; font-weight: 500; }
  .pain-box { background: #fff3f3; border-left: 4px solid #e74c3c; padding: 10px 14px; margin: 6px 0; border-radius: 4px; }
  .money-box { background: #f0fff0; border: 2px solid #27ae60; padding: 16px; border-radius: 8px; text-align: center; margin: 12px 0; }
  .money-box .amount { font-size: 28pt; font-weight: 700; color: #e74c3c; }
  .money-box .sublabel { font-size: 10pt; color: #666; }
  .summary-box { background: #f8f9ff; border: 1px solid #dde; padding: 12px 16px; border-radius: 6px; margin: 8px 0; }
  .temp-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 10pt; }
  .temp-hot { background: #ffe0e0; color: #c0392b; }
  .temp-warm { background: #fff3e0; color: #e67e22; }
  .temp-cold { background: #e0f0ff; color: #2980b9; }
  .checklist { list-style: none; }
  .checklist li { padding: 3px 0; font-size: 10pt; }
  .checklist li::before { content: '☐ '; color: #999; }
  .checklist li.checked::before { content: '☑ '; color: #27ae60; }
  .footer { margin-top: 30px; padding-top: 15px; border-top: 2px solid #eee; text-align: center; font-size: 9pt; color: #999; }
  .footer a { color: #1a1a2e; text-decoration: none; }
  @media print { body { padding: 0; } }
</style></head><body>
<div class="header">
  <img src="https://seamlessflow.ai/assets/website%20homelogo.png" alt="SeamlessFlow">
  <h1>Discovery Call Summary</h1>
  <p>${formData.date} • ${formData.dispensaryName || 'Client'}</p>
</div>

<div class="section">
  <h2>Business Information</h2>
  <div class="grid">
    <div class="field"><div class="label">Business Name</div><div class="value">${formData.dispensaryName || '—'}</div></div>
    <div class="field"><div class="label">Contact</div><div class="value">${formData.contactName || '—'} (${formData.contactTitle || '—'})</div></div>
    <div class="field"><div class="label">Phone</div><div class="value">${formData.phone || '—'}</div></div>
    <div class="field"><div class="label">Email</div><div class="value">${formData.email || '—'}</div></div>
    <div class="field"><div class="label">Location</div><div class="value">${formData.location || '—'}</div></div>
    <div class="field"><div class="label">Website</div><div class="value">${formData.website || '—'}</div></div>
    <div class="field"><div class="label">Years in Business</div><div class="value">${formData.yearsInBusiness || '—'}</div></div>
    <div class="field"><div class="label">Employees</div><div class="value">${formData.employeeCount || '—'}</div></div>
    <div class="field"><div class="label">Hours</div><div class="value">${formData.operatingHours || '—'}</div></div>
    <div class="field"><div class="label">Has GBP</div><div class="value">${formData.hasGBP || '—'}</div></div>
    <div class="field"><div class="label">Discovery Source</div><div class="value">${formData.discoverySource || '—'}</div></div>
  </div>
</div>

<div class="section">
  <h2>Time Drains</h2>
  <div class="field"><div class="label">Daily Bottlenecks</div><div class="value">${formData.dailyBottlenecks || '—'}</div></div>
  <div class="field"><div class="label">Repetitive Tasks</div><div class="value">${formData.repetitiveTasks || '—'}</div></div>
  <div class="field"><div class="label">Menu Update Process</div><div class="value">${formData.menuUpdateProcess || '—'}</div></div>
  <div class="field"><div class="label">METRC Frustrations</div><div class="value">${formData.metrcFrustrations || '—'}</div></div>
  <div class="field"><div class="label">Training Time</div><div class="value">${formData.budtenderTrainingTime || '—'}</div></div>
</div>

<div class="section">
  <h2>Money Leaks</h2>
  <div class="grid">
    <div class="field"><div class="label">Customer Acquisition</div><div class="value">${formData.customerAcquisition || '—'}</div></div>
    <div class="field"><div class="label">Peak/Slow Periods</div><div class="value">${formData.peakSlowPeriods || '—'}</div></div>
    <div class="field"><div class="label">Stock-Out Incidents</div><div class="value">${formData.stockOutIncidents || '—'}</div></div>
    <div class="field"><div class="label">After-Hours Missed Leads</div><div class="value">${formData.afterHoursMissedLeads || '—'}</div></div>
    <div class="field"><div class="label">Conversion Rate</div><div class="value">${formData.conversionRate || '—'}</div></div>
  </div>
</div>

<div class="section">
  <h2>Stress Points</h2>
  <div class="field"><div class="label">Primary Concerns</div><div class="value">${concerns}</div></div>
  <div class="field"><div class="label">METRC Issues</div><div class="value">${formData.metrcCloseCallsOrFines || '—'}</div></div>
  <div class="field"><div class="label">Regulatory Knowledge</div><div class="value">${formData.regulatoryKnowledge || '—'}</div></div>
  <div class="field"><div class="label">Key Person Dependencies</div><div class="value">${formData.keyPersonDependencies || '—'}</div></div>
</div>

<div class="section">
  <h2>Competition</h2>
  <div class="field"><div class="label">Nearby Competitors</div><div class="value">${formData.nearbyDispensaries || '—'}</div></div>
  <div class="field"><div class="label">Google Search Ranking</div><div class="value">${formData.googleSearchRanking || '—'}</div></div>
  <div class="field"><div class="label">Competitor Strategies</div><div class="value">${formData.competitorStrategies || '—'}</div></div>
</div>

${formData.demoNotes ? `<div class="section"><h2>Demo Notes</h2><div class="value">${formData.demoNotes}</div></div>` : ''}

<div class="section">
  <h2>Top 3 Pain Points</h2>
  ${formData.painPoint1 ? `<div class="pain-box"><strong>1.</strong> ${formData.painPoint1}</div>` : ''}
  ${formData.painPoint2 ? `<div class="pain-box"><strong>2.</strong> ${formData.painPoint2}</div>` : ''}
  ${formData.painPoint3 ? `<div class="pain-box"><strong>3.</strong> ${formData.painPoint3}</div>` : ''}
</div>

<div class="section">
  <h2>Monthly Impact</h2>
  <div class="money-box">
    <div class="amount">$${totalLoss.toLocaleString()}/mo</div>
    <div class="sublabel">Estimated monthly loss from inefficiencies</div>
  </div>
  <div class="grid">
    <div class="field"><div class="label">Hours Wasted/Month</div><div class="value">${formData.monthlyHoursWasted || '0'} hrs × $25/hr = $${(hoursVal * 25).toLocaleString()}</div></div>
    <div class="field"><div class="label">Missed Lead Revenue</div><div class="value">$${missedVal.toLocaleString()}/mo</div></div>
    <div class="field"><div class="label">Ranking Impact</div><div class="value">${formData.rankingImpact || '—'}</div></div>
  </div>
</div>

<div class="section">
  <h2>Next Steps</h2>
  <div class="grid">
    <div>
      <div class="field"><div class="label">Lead Temperature</div><div class="value"><span class="temp-badge temp-${formData.leadTemperature || 'warm'}">${(formData.leadTemperature || 'Not set').toUpperCase()}</span></div></div>
      <div class="field"><div class="label">Follow-Up Date</div><div class="value">${formData.followUpDate || '—'}</div></div>
    </div>
    <div>
      <ul class="checklist">
        <li class="${formData.followUpEmail ? 'checked' : ''}">Send follow-up email</li>
        <li class="${formData.sendProposal ? 'checked' : ''}">Send proposal</li>
        <li class="${formData.addToCRM ? 'checked' : ''}">Add to CRM</li>
      </ul>
    </div>
  </div>
  ${formData.additionalNotes ? `<div class="summary-box"><div class="label">Additional Notes</div><div class="value">${formData.additionalNotes}</div></div>` : ''}
</div>

<div class="footer">
  <img src="https://seamlessflow.ai/assets/website%20homelogo.png" alt="SeamlessFlow" style="width:140px;margin-bottom:8px;">
  <p><a href="tel:+13477498146">(347) 749-8146</a> | <a href="mailto:info@seamlessflow.ai">info@seamlessflow.ai</a> | <a href="https://seamlessflow.ai">seamlessflow.ai</a></p>
  <p style="margin-top:6px;">Generated ${new Date().toLocaleDateString()}</p>
</div>
</body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const updateField = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleConcern = (concern: string) => {
    const current = formData.primaryConcerns;
    if (current.includes(concern)) {
      updateField('primaryConcerns', current.filter(c => c !== concern));
    } else {
      updateField('primaryConcerns', [...current, concern]);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Calculate money math
  const hoursWasted = parseFloat(formData.monthlyHoursWasted) || 0;
  const hourlyRate = 25; // Average hourly cost
  const timeCost = hoursWasted * hourlyRate;
  const missedLeads = parseFloat(formData.lostRevenueFromMissedLeads) || 0;
  const totalMonthlyLoss = timeCost + missedLeads;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-card" key="step1">
            <h2>Basic Information</h2>
            <p className="step-description">Let&apos;s start with the dispensary details</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => updateField('date', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Dispensary Name</label>
                <input
                  type="text"
                  placeholder="Green Leaf Dispensary"
                  value={formData.dispensaryName}
                  onChange={e => updateField('dispensaryName', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={formData.contactName}
                  onChange={e => updateField('contactName', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Owner / Manager"
                  value={formData.contactTitle}
                  onChange={e => updateField('contactTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={e => updateField('phone', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="john@dispensary.com"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="123 Main St, City, State"
                  value={formData.location}
                  onChange={e => updateField('location', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  placeholder="www.dispensary.com"
                  value={formData.website}
                  onChange={e => updateField('website', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Years in Business</label>
                <select
                  value={formData.yearsInBusiness}
                  onChange={e => updateField('yearsInBusiness', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="<1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Employee Count</label>
                <select
                  value={formData.employeeCount}
                  onChange={e => updateField('employeeCount', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="20+">20+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Has Google Business Profile?</label>
                <select
                  value={formData.hasGBP}
                  onChange={e => updateField('hasGBP', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">Not Sure</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-card" key="step2">
            <h2>Time Drains</h2>
            <p className="step-description">Identify inefficiencies eating up valuable time</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>What are the biggest daily workflow bottlenecks?</label>
                <textarea
                  placeholder="Describe the main time-wasters in their daily operations..."
                  value={formData.dailyBottlenecks}
                  onChange={e => updateField('dailyBottlenecks', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>What repetitive tasks are done manually?</label>
                <textarea
                  placeholder="Menu updates, inventory counts, compliance reporting..."
                  value={formData.repetitiveTasks}
                  onChange={e => updateField('repetitiveTasks', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>How do they update menus across platforms?</label>
                <textarea
                  placeholder="Weedmaps, Leafly, website - manual or automated?"
                  value={formData.menuUpdateProcess}
                  onChange={e => updateField('menuUpdateProcess', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Metrc compliance frustrations?</label>
                <textarea
                  placeholder="What aspects of Metrc cause the most headaches?"
                  value={formData.metrcFrustrations}
                  onChange={e => updateField('metrcFrustrations', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>How long does budtender training take?</label>
                <select
                  value={formData.budtenderTrainingTime}
                  onChange={e => updateField('budtenderTrainingTime', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month+">1 month+</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-card" key="step3">
            <h2>Money Leaks</h2>
            <p className="step-description">Uncover revenue loss opportunities</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>Primary customer acquisition channels?</label>
                <textarea
                  placeholder="Walk-ins, Weedmaps, Google, referrals..."
                  value={formData.customerAcquisition}
                  onChange={e => updateField('customerAcquisition', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Peak and slow periods? Staff utilization?</label>
                <textarea
                  placeholder="Weekends busy, weekday mornings slow..."
                  value={formData.peakSlowPeriods}
                  onChange={e => updateField('peakSlowPeriods', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>How often do stock-outs occur? Lost sales estimate?</label>
                <textarea
                  placeholder="Popular items run out, estimated lost revenue..."
                  value={formData.stockOutIncidents}
                  onChange={e => updateField('stockOutIncidents', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>After-hours missed leads?</label>
                <textarea
                  placeholder="Calls/messages received when closed, how handled?"
                  value={formData.afterHoursMissedLeads}
                  onChange={e => updateField('afterHoursMissedLeads', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Estimated conversion rate?</label>
                <select
                  value={formData.conversionRate}
                  onChange={e => updateField('conversionRate', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="<25%">Less than 25%</option>
                  <option value="25-50%">25-50%</option>
                  <option value="50-75%">50-75%</option>
                  <option value="75%+">75%+</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-card" key="step4">
            <h2>Stress Points</h2>
            <p className="step-description">Understand their biggest anxieties</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>Primary concerns (select all that apply)</label>
                <div className="checkbox-group">
                  {['Compliance', 'Competition', 'Cash Flow', 'Staffing'].map(concern => (
                    <div
                      key={concern}
                      className={`checkbox-item ${formData.primaryConcerns.includes(concern) ? 'selected' : ''}`}
                      onClick={() => toggleConcern(concern)}
                    >
                      <div className="checkbox-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Any Metrc close calls or fines?</label>
                <textarea
                  placeholder="Describe any compliance issues or near-misses..."
                  value={formData.metrcCloseCallsOrFines}
                  onChange={e => updateField('metrcCloseCallsOrFines', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>How do they stay updated on regulations?</label>
                <textarea
                  placeholder="Industry associations, lawyers, informal networks..."
                  value={formData.regulatoryKnowledge}
                  onChange={e => updateField('regulatoryKnowledge', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Key person dependencies?</label>
                <textarea
                  placeholder="What happens if the owner/manager is unavailable?"
                  value={formData.keyPersonDependencies}
                  onChange={e => updateField('keyPersonDependencies', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-card" key="step5">
            <h2>Competition Analysis</h2>
            <p className="step-description">Understand the competitive landscape</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>How many dispensaries nearby?</label>
                <select
                  value={formData.nearbyDispensaries}
                  onChange={e => updateField('nearbyDispensaries', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1-3">1-3</option>
                  <option value="4-6">4-6</option>
                  <option value="7-10">7-10</option>
                  <option value="10+">10+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Where do they rank on Google for local searches?</label>
                <textarea
                  placeholder="Top 3, first page, not found..."
                  value={formData.googleSearchRanking}
                  onChange={e => updateField('googleSearchRanking', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>What are competitors doing better?</label>
                <textarea
                  placeholder="Marketing, customer service, online presence..."
                  value={formData.competitorStrategies}
                  onChange={e => updateField('competitorStrategies', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-card" key="step6">
            <h2>Live Demo Notes</h2>
            <p className="step-description">Document findings from the live demonstration</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>Demo observations and findings</label>
                <textarea
                  placeholder="Search rankings shown, visibility metrics, competitor comparisons, client reactions..."
                  value={formData.demoNotes}
                  onChange={e => updateField('demoNotes', e.target.value)}
                  style={{ minHeight: '200px' }}
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-card" key="step7">
            <h2>Pain Point Summary</h2>
            <p className="step-description">Consolidate the top 3 pain points identified</p>

            <div className="form-grid single">
              <div className="pain-card">
                <h4><span>1</span> Primary Pain Point</h4>
                <textarea
                  placeholder="The biggest issue causing problems..."
                  value={formData.painPoint1}
                  onChange={e => updateField('painPoint1', e.target.value)}
                />
              </div>

              <div className="pain-card">
                <h4><span>2</span> Secondary Pain Point</h4>
                <textarea
                  placeholder="The second most pressing issue..."
                  value={formData.painPoint2}
                  onChange={e => updateField('painPoint2', e.target.value)}
                />
              </div>

              <div className="pain-card">
                <h4><span>3</span> Third Pain Point</h4>
                <textarea
                  placeholder="Another significant challenge..."
                  value={formData.painPoint3}
                  onChange={e => updateField('painPoint3', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-card" key="step8">
            <h2>Money Math</h2>
            <p className="step-description">Calculate the financial impact</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Monthly hours wasted on inefficiencies</label>
                <input
                  type="number"
                  placeholder="20"
                  value={formData.monthlyHoursWasted}
                  onChange={e => updateField('monthlyHoursWasted', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Estimated lost revenue from missed leads ($)</label>
                <input
                  type="number"
                  placeholder="2000"
                  value={formData.lostRevenueFromMissedLeads}
                  onChange={e => updateField('lostRevenueFromMissedLeads', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Ranking impact notes</label>
                <textarea
                  placeholder="How poor visibility affects traffic and sales..."
                  value={formData.rankingImpact}
                  onChange={e => updateField('rankingImpact', e.target.value)}
                />
              </div>
            </div>

            <div className="calc-box">
              <h3>Monthly Cost Analysis</h3>
              <div className="calc-row">
                <span className="label">Time cost ({hoursWasted} hrs × $25/hr)</span>
                <span className="value">${timeCost.toLocaleString()}</span>
              </div>
              <div className="calc-row">
                <span className="label">Missed lead revenue</span>
                <span className="value">${missedLeads.toLocaleString()}</span>
              </div>
              <div className="calc-row total">
                <span className="label">Total Monthly Loss</span>
                <span className="value">${totalMonthlyLoss.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="step-card" key="step9">
            <h2>Next Steps</h2>
            <p className="step-description">Action items and follow-up</p>

            <div className="form-grid single">
              <div className="form-group">
                <label>Action items</label>
                <div className="checkbox-group">
                  <div
                    className={`checkbox-item ${formData.followUpEmail ? 'selected' : ''}`}
                    onClick={() => updateField('followUpEmail', !formData.followUpEmail)}
                  >
                    <div className="checkbox-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Send follow-up email</span>
                  </div>

                  <div
                    className={`checkbox-item ${formData.sendProposal ? 'selected' : ''}`}
                    onClick={() => updateField('sendProposal', !formData.sendProposal)}
                  >
                    <div className="checkbox-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Send proposal</span>
                  </div>

                  <div
                    className={`checkbox-item ${formData.addToCRM ? 'selected' : ''}`}
                    onClick={() => updateField('addToCRM', !formData.addToCRM)}
                  >
                    <div className="checkbox-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Add to CRM</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Follow-up date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={e => updateField('followUpDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Lead temperature</label>
                <div className="temp-selector">
                  <button
                    type="button"
                    className={`temp-btn hot ${formData.leadTemperature === 'hot' ? 'selected' : ''}`}
                    onClick={() => updateField('leadTemperature', 'hot')}
                  >
                    🔥 HOT
                  </button>
                  <button
                    type="button"
                    className={`temp-btn warm ${formData.leadTemperature === 'warm' ? 'selected' : ''}`}
                    onClick={() => updateField('leadTemperature', 'warm')}
                  >
                    ☀️ WARM
                  </button>
                  <button
                    type="button"
                    className={`temp-btn cold ${formData.leadTemperature === 'cold' ? 'selected' : ''}`}
                    onClick={() => updateField('leadTemperature', 'cold')}
                  >
                    ❄️ COLD
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Additional notes</label>
                <textarea
                  placeholder="Any other important notes..."
                  value={formData.additionalNotes}
                  onChange={e => updateField('additionalNotes', e.target.value)}
                />
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Call Summary</h3>

              <div className="summary-card">
                <h4>Dispensary</h4>
                <p>{formData.dispensaryName || '—'} • {formData.location || '—'}</p>
              </div>

              <div className="summary-card">
                <h4>Contact</h4>
                <p>{formData.contactName || '—'} ({formData.contactTitle || '—'}) • {formData.email || '—'}</p>
              </div>

              <div className="summary-card">
                <h4>Key Pain Points</h4>
                <p>1. {formData.painPoint1 || '—'}</p>
                <p>2. {formData.painPoint2 || '—'}</p>
                <p>3. {formData.painPoint3 || '—'}</p>
              </div>

              <div className="summary-card">
                <h4>Monthly Impact</h4>
                <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--danger)' }}>
                  ${totalMonthlyLoss.toLocaleString()}/month potential savings
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="form-container">
      <header className="form-header">
        <h1>Discovery Call Generator</h1>
        <p>SeamlessFlow.ai • Discovery Call Tool</p>
      </header>

      {/* Progress */}
      <div className="progress-container">
        <div className="progress-steps">
          {steps.map(step => (
            <div
              key={step.id}
              className={`progress-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-number">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentStep - 1) / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      <div className="form-nav">
        {currentStep > 1 && (
          <button className="btn btn-secondary" onClick={prevStep}>
            ← Back
          </button>
        )}

        {currentStep < 9 ? (
          <button className="btn btn-primary" onClick={nextStep}>
            Next →
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={generatePDF}
          >
            📄 Download PDF
          </button>
        )}
      </div>
    </main>
  );
}
