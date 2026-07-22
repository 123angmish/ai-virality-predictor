import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from config import Config

class ReportGenerator:
    @staticmethod
    def generate_pdf(analysis):
        """
        Generates a premium PDF report using ReportLab.
        
        Args:
            analysis (dict): The complete analysis dictionary from the database.
            
        Returns:
            str: Path to the generated PDF file.
        """
        pdf_filename = f"report_{analysis['id']}.pdf"
        pdf_path = os.path.join(Config.REPORT_FOLDER, pdf_filename)
        
        # Setup document
        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=letter,
            rightMargin=54,
            leftMargin=54,
            topMargin=54,
            bottomMargin=54
        )
        
        styles = getSampleStyleSheet()
        
        # Custom styles for Dark Theme elements or clean professional look
        # Since PDFs print on paper, we use a clean light layout with deep corporate colors
        primary_color = colors.HexColor("#4f46e5")   # Indigo
        secondary_color = colors.HexColor("#0f172a") # Slate 900
        text_color = colors.HexColor("#334155")      # Slate 700
        accent_color = colors.HexColor("#10b981")    # Emerald Green
        
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=24,
            leading=28,
            textColor=secondary_color,
            spaceAfter=6
        )
        
        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#64748b"),
            spaceAfter=20
        )
        
        section_heading = ParagraphStyle(
            'SectionHeading',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            leading=18,
            textColor=primary_color,
            spaceBefore=14,
            spaceAfter=8,
            keepWithNext=True
        )
        
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=text_color,
            spaceAfter=6
        )
        
        body_bold = ParagraphStyle(
            'BodyBold',
            parent=body_style,
            fontName='Helvetica-Bold'
        )

        table_header_style = ParagraphStyle(
            'TableHeader',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9,
            leading=12,
            textColor=colors.white
        )

        story = []
        
        # 1. Header Section
        story.append(Paragraph("AI VIRALITY PREDICTION REPORT", title_style))
        story.append(Paragraph(f"Generated on {analysis['created_at']} | Analysis ID: #{analysis['id']}", subtitle_style))
        story.append(Spacer(1, 10))
        
        # 2. Score Summary Block (Table with custom styling)
        score = analysis['virality_score']
        conf = analysis['confidence']
        perf_class = analysis['performance_class']
        
        class_color = "#ef4444" # red
        if perf_class == "Excellent":
            class_color = "#10b981" # green
        elif perf_class == "Good":
            class_color = "#3b82f6" # blue
        elif perf_class == "Average":
            class_color = "#f59e0b" # amber
            
        summary_data = [
            [
                Paragraph("<b>Virality Score</b>", body_style),
                Paragraph("<b>Confidence Level</b>", body_style),
                Paragraph("<b>Performance Class</b>", body_style)
            ],
            [
                Paragraph(f"<font size=20 color='{primary_color.hexval()}'><b>{score}/100</b></font>", body_style),
                Paragraph(f"<font size=20 color='#64748b'><b>{conf}%</b></font>", body_style),
                Paragraph(f"<font size=20 color='{class_color}'><b>{perf_class}</b></font>", body_style)
            ]
        ]
        
        summary_table = Table(summary_data, colWidths=[2.2*inch, 2.2*inch, 2.2*inch])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
            ('PADDING', (0,0), (-1,-1), 12),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LINEBELOW', (0,0), (-1,0), 1, colors.HexColor("#e2e8f0")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ]))
        
        story.append(summary_table)
        story.append(Spacer(1, 15))
        
        # 3. Meta information table
        meta = analysis['metadata'] or {}
        
        info_rows = [
            [Paragraph("<b>Video Title</b>", body_bold), Paragraph(analysis['title'], body_style)],
            [Paragraph("<b>Source Mode</b>", body_bold), Paragraph(analysis['type'].capitalize(), body_style)],
            [Paragraph("<b>Duration</b>", body_bold), Paragraph(f"{analysis['duration']} seconds", body_style)]
        ]
        
        if analysis['type'] == 'youtube':
            info_rows.append([Paragraph("<b>Uploader</b>", body_bold), Paragraph(meta.get('uploader', 'N/A'), body_style)])
            info_rows.append([Paragraph("<b>Views</b>", body_bold), Paragraph(f"{meta.get('views', 0):,}", body_style)])
            info_rows.append([Paragraph("<b>Engagement Rate</b>", body_bold), Paragraph(f"{meta.get('metrics', {}).get('engagement_rate', 0.0)}%", body_style)])
            
        info_table = Table(info_rows, colWidths=[2.0*inch, 4.6*inch])
        info_table.setStyle(TableStyle([
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
            ('PADDING', (0,0), (-1,-1), 6),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#f1f5f9")),
        ]))
        
        # We put the thumbnail and video info in a side-by-side or stacked format
        # Check if thumbnail exists locally
        thumb_relative = analysis['thumbnail_path']
        story.append(Paragraph("General Specifications", section_heading))
        
        if thumb_relative.startswith('/static/'):
            # Convert /static/ to the actual filesystem path
            local_thumb_path = os.path.join(Config.BASE_DIR, thumb_relative.lstrip('/'))
            if os.path.exists(local_thumb_path):
                try:
                    # Resize thumbnail image to fit report nicely (e.g. 2.2 inch width, 1.25 inch height)
                    img = Image(local_thumb_path, width=2.2*inch, height=1.25*inch)
                    img.hAlign = 'LEFT'
                    
                    # Layout side-by-side: Thumbnail on Left, Information on Right
                    side_table = Table([[img, info_table]], colWidths=[2.4*inch, 4.2*inch])
                    side_table.setStyle(TableStyle([
                        ('VALIGN', (0,0), (-1,-1), 'TOP'),
                        ('LEFTPADDING', (1,0), (1,0), 10),
                        ('RIGHTPADDING', (0,0), (-1,-1), 0),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
                        ('TOPPADDING', (0,0), (-1,-1), 0),
                    ]))
                    story.append(side_table)
                except Exception:
                    story.append(info_table)
            else:
                story.append(info_table)
        else:
            story.append(info_table)
            
        story.append(Spacer(1, 15))
        
        # 4. Feature Audits
        story.append(Paragraph("Visual & Behavioral Features", section_heading))
        features = analysis['features'] or {}
        
        feature_rows = [
            [Paragraph("Feature Metric", table_header_style), Paragraph("Extracted Value", table_header_style), Paragraph("Target Benchmarks", table_header_style)]
        ]
        
        # Mapping metric names to readable labels and optimal bounds
        metric_benchmarks = [
            ('hook_score', 'Hook Score (First 3s)', '> 70.0', '0-100'),
            ('brightness', 'Average Brightness', '100.0 - 150.0', '0-255'),
            ('contrast', 'Average Contrast', '60.0 - 120.0', '0-255'),
            ('motion_score', 'Motion Score', '2.0 - 8.0', '0-100'),
            ('scene_change_score', 'Scene Cuts / Sec', '0.1 - 0.3', 'cuts/sec'),
            ('sharpness', 'Sharpness Score', '> 150.0', 'var of laplacian'),
            ('average_saturation', 'Color Saturation', '80.0 - 140.0', '0-255'),
            ('face_count', 'Face Detection Count', '>= 1.0 (recommended)', 'faces/frame'),
            ('emotion_score', 'Emotion Intensity', '> 50.0', '0-100'),
            ('audio_energy', 'Audio Energy Score', '55.0 - 80.0', '0-100')
        ]
        
        for key, name, benchmark, unit in metric_benchmarks:
            val = features.get(key, 'N/A')
            if val != 'N/A':
                val = f"{val} ({unit})" if unit not in ('0-100', '0-255') else f"{val}"
            feature_rows.append([
                Paragraph(name, body_bold),
                Paragraph(str(val), body_style),
                Paragraph(benchmark, body_style)
            ])
            
        feat_table = Table(feature_rows, colWidths=[2.6*inch, 2.0*inch, 2.0*inch])
        feat_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), primary_color),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('PADDING', (0,0), (-1,-1), 5),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ]))
        
        story.append(feat_table)
        story.append(Spacer(1, 15))
        
        # 5. Recommendations (Keep together to avoid page breaks mid-recommendation)
        rec_elements = []
        rec_elements.append(Paragraph("Actionable Recommendations", section_heading))
        
        recs = analysis['recommendations'] or []
        for r in recs:
            badge_color = "#ef4444" if r['severity'] == 'high' else ("#f59e0b" if r['severity'] == 'medium' else "#3b82f6")
            rec_text = f"<b><font color='{badge_color}'>[{r['severity'].upper()}]</font> {r['title']}</b> ({r['category']})<br/>{r['description']}"
            rec_elements.append(Paragraph(rec_text, body_style))
            rec_elements.append(Spacer(1, 4))
            
        story.append(KeepTogether(rec_elements))
        
        # Build Document
        doc.build(story)
        return pdf_path
