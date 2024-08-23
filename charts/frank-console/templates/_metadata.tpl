{{/*
frankframework.metadata creates a standard metadata header.
It creates a 'metadata:' section with name and labels.
*/}}
{{- define "frank-console.metadata" -}}
metadata:
  name: {{ template "frank-console.fullname" . }}
  labels:
{{ include "frank-console.labels" . | indent 4 -}}
{{- end -}}
