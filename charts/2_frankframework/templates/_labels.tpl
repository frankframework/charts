{{/*
Common labels
*/}}
{{- define "frankframework.labels" -}}
helm.sh/chart: {{ include "frankframework.chart" . }}
{{ include "frankframework.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "frankframework.selectorLabels" -}}
app.kubernetes.io/name: {{ include "frankframework.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
