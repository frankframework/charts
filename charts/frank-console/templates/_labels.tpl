{{/*
Common labels
*/}}
{{- define "frank-console.labels" -}}
helm.sh/chart: {{ include "frank-console.chart" . }}
{{ include "frank-console.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "frank-console.selectorLabels" -}}
app.kubernetes.io/name: {{ include "frank-console.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
