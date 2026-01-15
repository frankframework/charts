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
frankframework/hazelcast: {{ .Release.Name }}
{{- end -}}

{{- define "frankframework.ladybugLabels" -}}
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
{{- define "frankframework.ladybugSelectorLabels" -}}
app.kubernetes.io/name: {{ template "frankframework.fullname" . }}-ladybug-database
app.kubernetes.io/component: primary
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
