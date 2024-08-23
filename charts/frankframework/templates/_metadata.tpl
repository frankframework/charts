{{/*
frankframework.metadata creates a standard metadata header.
It creates a 'metadata:' section with name and labels.
*/}}
{{- define "frankframework.metadata" -}}
metadata:
  name: {{ template "frankframework.fullname" . }}
  labels:
{{ include "frankframework.labels" . | indent 4 -}}
{{- end -}}
