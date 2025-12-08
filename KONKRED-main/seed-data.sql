-- Insert sample protocols
INSERT INTO protocols (
  slug, title, tagline, description, price_cents, industry, complexity, sample_output, whats_included, file_url, is_featured
) VALUES
(
  'financial-analysis-protocol',
  'Financial Analysis Protocol',
  'Automated financial statement analysis with executive summaries',
  'Comprehensive financial analysis protocol that processes balance sheets, income statements, and cash flow statements to generate detailed executive summaries and risk assessments. Built for financial analysts and investment professionals.',
  25000,
  'Finance',
  'advanced',
  '{
    "analysis_id": "FA-2024-001",
    "company": "Acme Corp",
    "period": "Q4 2023",
    "revenue_growth": "+23.5%",
    "profit_margin": "18.7%",
    "risk_score": "Low",
    "recommendations": [
      "Expand into Asian markets",
      "Optimize supply chain costs",
      "Consider strategic acquisitions"
    ]
  }',
  ARRAY[
    'Core Executive Protocol',
    'Input schema definitions',
    'Output schema specifications',
    'Financial data validation rules',
    'Risk assessment framework',
    'Executive summary templates',
    'Compliance documentation'
  ],
  'https://example.com/protocols/financial-analysis-protocol.zip',
  true
),
(
  'saas-metrics-protocol',
  'SaaS Metrics Protocol',
  'Real-time SaaS performance monitoring and forecasting',
  'Advanced SaaS metrics analysis protocol that calculates churn, LTV, CAC, and generates growth forecasts based on historical performance data. Essential for SaaS founders and operators.',
  49000,
  'SaaS',
  'enterprise',
  '{
    "metrics_period": "January 2024",
    "monthly_recurring_revenue": "$2.4M",
    "annual_recurring_revenue": "$28.8M",
    "customer_acquisition_cost": "$450",
    "lifetime_value": "$12,500",
    "ltv_cac_ratio": "27.8",
    "churn_rate": "2.1%",
    "net_revenue_retention": "118%",
    "forecast_mrr_next_quarter": "$2.7M"
  }',
  ARRAY[
    'Core Executive Protocol',
    'SaaS metrics calculation engine',
    'Forecasting algorithms',
    'Benchmark data sets',
    'Performance dashboards',
    'Alert configurations',
    'Integration documentation'
  ],
  'https://example.com/protocols/saas-metrics-protocol.zip',
  true
),
(
  'compliance-audit-protocol',
  'Compliance Audit Protocol',
  'Automated regulatory compliance assessment and reporting',
  'Enterprise-grade compliance audit protocol that evaluates systems against GDPR, SOC 2, and ISO 27001 standards with detailed remediation recommendations. Critical for compliance teams.',
  99000,
  'Compliance',
  'enterprise',
  '{
    "audit_id": "CA-2024-001",
    "framework": "SOC 2 Type II",
    "audit_date": "2024-01-20",
    "compliance_score": "87%",
    "critical_findings": 0,
    "high_risk_findings": 2,
    "medium_risk_findings": 5,
    "low_risk_findings": 12,
    "control_coverage": "94%",
    "recommendations": [
      "Implement multi-factor authentication for all admin accounts",
      "Enhance logging and monitoring capabilities",
      "Review and update incident response procedures"
    ]
  }',
  ARRAY[
    'Core Executive Protocol',
    'Multi-framework assessment engine',
    'Control evaluation criteria',
    'Remediation workflow templates',
    'Audit report generators',
    'Evidence collection procedures',
    'Continuous monitoring configuration'
  ],
  'https://example.com/protocols/compliance-audit-protocol.zip',
  true
),
(
  'content-generation-protocol',
  'Content Generation Protocol',
  'Scalable content creation with brand voice consistency',
  'Professional content generation protocol that maintains brand voice while creating blog posts, social media content, and marketing materials at scale. Perfect for marketing teams.',
  29000,
  'Marketing',
  'standard',
  '{
    "content_batch_id": "CG-2024-001",
    "brand_guidelines_applied": true,
    "generated_pieces": 5,
    "content_types": [
      "blog_post",
      "twitter_thread",
      "linkedin_post",
      "email_newsletter",
      "instagram_caption"
    ],
    "tone_consistency_score": "94%",
    "estimated_time_saved": "4.5 hours",
    "approval_required": false
  }',
  ARRAY[
    'Core Executive Protocol',
    'Brand voice analyzer',
    'Content template library',
    'Quality assessment metrics',
    'SEO optimization rules',
    'Social media formatting',
    'Analytics integration'
  ],
  'https://example.com/protocols/content-generation-protocol.zip',
  false
),
(
  'customer-support-protocol',
  'Customer Support Protocol',
  'Intelligent ticket triage and response automation',
  'Automated customer support protocol that triages incoming tickets, suggests responses, and escalates complex issues. Designed for support teams of all sizes.',
  24000,
  'Support',
  'standard',
  '{
    "session_id": "CS-2024-001",
    "tickets_processed": 47,
    "auto_resolved": 31,
    "escalated_to_human": 8,
    "pending_review": 8,
    "response_time_avg": "2.3 minutes",
    "satisfaction_score": "4.6/5",
    "cost_savings": "$127"
  }',
  ARRAY[
    'Core Executive Protocol',
    'Ticket classification engine',
    'Response suggestion system',
    'Escalation rules',
    'Sentiment analysis',
    'Multi-language support',
    'Integration APIs'
  ],
  'https://example.com/protocols/customer-support-protocol.zip',
  false
);