{{/*
frankframework.util.merge will merge two YAML templates and output the result.

This takes an array of three values:
- the top context
- the template name of the overrides (destination)
- the template name of the base (source)

*/}}
{{- define "frank-console.util.merge" -}}
{{- $top := first . -}}
{{- $tpl := fromYaml (include (index . 1) $top) | default (dict ) -}}
{{- $overrides := fromYaml (include (index . 2) $top) | default (dict ) -}}
{{- toYaml (merge $tpl $overrides) -}}
{{- end -}}
